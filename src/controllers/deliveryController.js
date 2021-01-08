const deliveryModel = require('../models/delivery')
const userModel = require('../models/user')
const ventaModel = require('../models/venta')
const productoModel = require('../models/producto')
const time = require('../config/handlebars')
const session = require('express-session')
const controller = {}
controller.getPedido = async() => {
    const data = await deliveryModel.getPedidos()
    for(var i = 0; i< data.length; i++){
        var obj = data[i]
        var id = obj.idClient
        var cliente = await userModel.find(id)
        var numero = await userModel.getPhone(id)
        var idMio = session.user.idUser
        var photo = await userModel.getPhoto(idMio)
        data[i].foto = photo[0].photo
        data[i].numero = numero[0].phone
        data[i].cliente = cliente[0].name
        data[i].direccion = cliente[0].address
        var idSale = obj.idSale.toString()
        data[i].idSale = idSale
    }
    console.log(data)
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