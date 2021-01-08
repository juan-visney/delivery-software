const express = require('express')
const router = express.Router()
const {estaLogueado, noestaLogueado} = require('../config/authentication')
const userModel = require('../models/user')
const productModel = require('../models/producto')
const productController = require('../controllers/productoController')
const ventaController = require('../controllers/ventaController')
const session = require('express-session')
const twi = require('../config/twilio')

function esCliente(req, res, next){
    if(req.user.rol == 'cliente'){
        next()
    }
    else{
        res.redirect('/')
    }
}

router.get('/', estaLogueado, esCliente, async (req, res) => {
    const productos = await productModel.get()
    for(var i = 0; i< productos.length; i++){
        var obj = productos[i]
        var id = obj.idBusiness
        var empresa = await userModel.find(id)
        productos[i].empresa = empresa[0].name
    }
    res.render('./cliente/index', {productos: productos})
})

router.post('/quitarDetalle/:id', estaLogueado, esCliente, async(req, res) => {
    const id = req.params.id.toString()
    const result = await ventaController.deleteDetail(id)
    if(result === 'error')
        req.flash('message','Error no se ha podido quitar el producto')
    else
        req.flash('message','Se ha quitado el producto del carrito')
    res.redirect('/cliente/cart')
})
router.get('/perfil', (req, res) => {
    res.render('./cliente/perfil')
})
router.get('/buscar/:name', estaLogueado, esCliente, async (req, res) => {
    const empresa = await userModel.findByName(req.params.name)
    const productos = await productModel.find(empresa[0].idUser)
    const detalles = await ventaController.getDetalle()
    var total = 0;
    for(var i = 0; i< detalles.length; i++){
        var obj = detalles[i]
        var id = obj.idProduct
        var producto = await productModel.getAll(id)
        detalles[i].producto = producto[0].name
        detalles[i].precio = parseFloat(producto[0].price) * parseFloat(detalles[i].lot)
        total = total + detalles[i].precio
    }
    res.render('./cliente/empresa', {productos: productos,empresa: empresa[0],detalles: detalles,tota: total})
})

router.post('/add', estaLogueado, esCliente, ventaController.insertDetalle)

router.post('/compra', estaLogueado, esCliente, (req, res) => {
    ventaController.insertCompra(session.user.idUser, req.body.idSale, req.body.cost)
    req.flash('success','Se ha registrado su compra, en un momento le llegara informacion de su pedido')
    res.redirect('/cliente/')
})

router.get('/cart', estaLogueado, esCliente, async (req, res) => {
    const productos = await productModel.get()
    for(var i = 0; i< productos.length; i++){
        var obj = productos[i]
        var id = obj.idBusiness
        var empresa = await userModel.find(id)
        productos[i].empresa = empresa[0].name
    }
    const detalles = await ventaController.getDetalle()
    var total = 0;
    for(var i = 0; i< detalles.length; i++){
        var obj = detalles[i]
        var id = obj.idProduct
        var producto = await productModel.getAll(id)
        detalles[i].producto = producto[0].name
        detalles[i].precio = parseFloat(producto[0].price) * parseFloat(detalles[i].lot)
        total = total + detalles[i].precio
    }
    const idSale = detalles[0].idSale
    res.render('./cliente/index', {productos: productos,detalles: detalles,total: total,idSale: idSale})
})

module.exports = router