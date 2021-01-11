const deliveryModel = require('../models/delivery')
const userModel = require('../models/user')
const ventaModel = require('../models/venta')
const userController = require('../controllers/userController')
const ventaController = require('../controllers/ventaController')
const productoController = require('../controllers/productoController')
const session = require('express-session')
const twi = require('../config/twilio')
const model = require('../models/venta')
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
controller.anuncio = async (req, res) => {
    const nombreDelivery = await userController.getName(session.user.idUser)
    const number = parseInt(req.body.numero)
    var mensaje = 'Hola tu pedido ya viene en camino\nLo esta traendo el delivery: '+nombreDelivery[0].name+'\nEl detalle del pedido es el siguiente: \n'
    mensaje = mensaje + await ventaController.aviso(req.body.idSale)
    mensaje = mensaje + 'Con un costo total de '+req.body.costo
    twi.init(number, mensaje)
    const idSale = req.body.idSale
    var usuarios = await userController.usuarios(idSale)
    for(var i=0;i<usuarios.length;i++){
        const num = usuarios[i].phone
        const nombre = usuarios[i].name
        const idUser = usuarios[i].idUser
        var mensajeE = 'Empresa '+ nombre + ', el cliente ' + req.body.cliente +  ' solicito \n'+await productoController.getProductos(idUser, idSale) 
        + 'El delivery: ' + nombreDelivery[0].name + ' vendra a recogerlo\nPorfavor tengalo listo'
        twi.init(num, mensajeE)
    }
    console.log(req.body.cliente)           
    var user = await userModel.findByName(req.body.cliente)
    console.log(user)
    const idCliente = user[0].idUser
    const idDelivery = session.user.idUser
    await deliveryModel.enProceso(idSale)
    var detalles = await ventaModel.getById1(idSale)
    for(var i = 0 ; i < detalles.length ; i++){
        const empresa = await ventaModel.getDetalles(detalles[i].idProduct)
        detalles[i].direccion = empresa[0].dir
        detalles[i].name = empresa[0].name
        detalles[i].producto = empresa[0].prod
    }
    res.render('./delivery/proceso', {idSale, idCliente, idDelivery, cliente: req.body.cliente, detalles: detalles})
}
controller.insertPedido = async (req, res) => {
    const{idSale, idClient, idDeliver} = req.body
    const pedido = {idSale, idClient, idDeliver}
    await ventaModel.insertPedido(pedido)
    req.flash('success', 'Bien hecho, entregaste un pedido')
    res.redirect('/delivery/')
}
module.exports = controller