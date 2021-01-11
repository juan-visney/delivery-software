const model = require('../models/venta')
const productModel = require('../models/producto')
const controller = {}
controller.getLast = async() => {
    const data = await model.find()
    return data
}
controller.getDetalle = async() => {
    const idDetail = await model.getNumberVenta()
    var data = ''
    var id
    if(idDetail[0].id == null){
        id = 1
    }
    else {
        id = parseInt(idDetail[0].id) + 1
    }
    data = await model.getById(id)
    return data;
}
controller.delete = async() => {
    var last = await model.getNumberVenta()
    if(last[0].id == null)
        last[0].id = 0
    last = parseInt(last[0].id) + 1
    await model.delete(last)
}
controller.deleteDetail = async(req, res) => {
    const id = req.params.id.toString()
    const prod = await productModel.findByUser(req.body.name)
    const idProd = prod[0].idProduct
    const cantAnt = prod[0].quantity
    const cant = parseInt(req.body.cant)+cantAnt
    await productModel.updateCant(idProd, cant)
    var quitar = await model.deleteDetail(id)
    if(quitar === 'error')
        req.flash('message','Error no se ha podido quitar el producto')
    else
        req.flash('message','Se ha quitado el producto del carrito')
    res.redirect('/cliente/cart')
}
controller.aviso = async(idSale) => {
    const data = await model.getById(idSale)
    var respuesta = ""
    for(var i=0;i<data.length;i++){
        const producto = await productModel.getName(data[i].idProduct)
        respuesta = respuesta + 'Producto: ' + producto[0].name + ', Cantidad: '+data[i].lot+'\n'
    }
    return respuesta
}
controller.insertCompra = async (idClient, idSale, cost) => {
    const estado = 'activo'
    const newVenta = {idSale, idClient, cost, estado}
    try{
        var inserted = await model.insertVenta(newVenta)
        if(inserted === 'error'){
            res.send('error')
        }
    }
    catch(error){

    }
}
controller.insertDetalle = async (req, res) => {
    const data = await model.getNumberVenta()
    var idSale = data[0].id
    if(idSale == null){
        idSale = '1'
    }
    else idSale = parseFloat(idSale) + 1
    const lot = req.body.cant
    const idProduct = req.body.id
    const newDetalle = {idProduct, idSale, lot}
    const producto = await productModel.getName(idProduct)
    try{
        var up = 'no'
        const product = await productModel.getAll(idProduct)
        var cant = req.body.cant.toString()
        if(parseInt(product[0].quantity)>=cant){
            cant=parseInt(product[0].quantity)-parseInt(cant)
            await productModel.updateCant(idProduct,cant)
            up = 'yes'
        }
        if(up == 'yes'){
            var inserted = await model.insertDetalle(newDetalle)
            if(inserted === 'error'){
                req.flash('message','No se pudo agregar el producto ' + producto[0].name + ' al carrito')
                res.redirect('/cliente/cart/')
            }
            else{
                req.flash('success','Se ha agregado el producto ' + producto[0].name + ' al carrito')
                res.redirect('/cliente/cart/')
            }
        }
        else{
            req.flash('message','No se pudo agregar el producto ' + producto[0].name + ' al carrito')
            res.redirect('/cliente/cart/')
        }
    }
    catch(error){

    }
}

module.exports = controller