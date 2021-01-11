const model = require('../models/producto')
const controller = {}

controller.insertProduct = async (req, res) => {
    const estado = 'activo'
    const {name, idBusiness, quantity, price, description, photo} = req.body
    const newProduct = {name, idBusiness, quantity, price, description, photo, estado}
    try{
        var inserted = await model.insert(newProduct)
        if(inserted === 'error'){
            res.send('error')
        }
        else{
            req.flash('success','Se ha agregado el producto ' + newProduct.name + ' al menu')
            res.redirect('/empresa/')
        }
    }
    catch(error){

    }
}
controller.deleteProduct = async (req, res) => {
    const id = req.params.id
    const estado = 'inactivo'
    var del = await model.delete(estado, id)
    if(del == 'error')
        req.flash('message','No se puede retirar del menu')
    else
        req.flash('success','Se retiro el producto del menu')
    res.redirect('/empresa/')
}
controller.editProduct = async (req, res) => {
    if(req.body.photo == ''){
        req.body.photo = req.body.foto
    }
    const idProduct = req.params.id
    const {idBusiness, quantity, price, description, name, photo, estado} = req.body
    const product = {idProduct, idBusiness, quantity, price, description, name, photo, estado}
    var up = await model.update(product)
    if(up == 'error')
        req.flash('message','No se puede actualizar el producto')
    else
        req.flash('success','Se actualizo el producto en el menu')
    res.redirect('/empresa/')
}
controller.getProductos = async (idBusiness, idSale) => {
    var res = await model.getProductosVenta(idBusiness, idSale);
    var mensaje = ''
    var suma = 0
    for(var i = 0 ; i < res.length ; i++){
        mensaje = mensaje + res[i].lot + ' ' + res[i].name + '\n'
        suma = suma + parseInt(res[i].price)*parseInt(res[i].lot)
    }
    mensaje = mensaje + 'Haciendo un total de: ' + suma + ' Bs.\n'
    return mensaje
} 
controller.getVentas = async (idBusiness) => {
    const ventas = await model.getVentas(idBusiness)
    return ventas
}
controller.getVentasDelivery = async (idDelivery) => {
    const ventas = await model.getVentasDelivery(idDelivery)
    return ventas
}
module.exports = controller