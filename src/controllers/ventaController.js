const model = require('../models/venta')
const productModel = require('../models/producto')
const controller = {}
controller.getLast = async() => {
    const data = await model.find()
    return data
}
controller.getDetalle = async() => {
    const idDetail = await controller.getLast()
    const id = parseFloat(idDetail[0].id)
    const data = await model.getById(id)
    return data;
}
controller.deleteDetail = async(id) => {
    try{
        var quitar = await model.deleteDetail(id)
        if(quitar === 'error'){
            res.send('error')
        }
    }
    catch(error){

    }
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
    const newVenta = {idSale, idClient, cost}
    console.log(newVenta)
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
        var inserted = await model.insertDetalle(newDetalle)
        if(inserted === 'error'){
            res.send('error')
        }
        else{
            req.flash('success','Se ha agregado el producto ' + producto[0].name + ' al carrito')
            res.redirect('/cliente/cart/')
        }
    }
    catch(error){

    }
}

module.exports = controller