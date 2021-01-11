const express = require('express')
const router = express.Router()
const {estaLogueado, noestaLogueado} = require('../config/authentication')
const userModel = require('../models/user')
const productModel = require('../models/producto')
const ventaController = require('../controllers/ventaController')
const session = require('express-session')

function esCliente(req, res, next){
    console.log(req.user)
    if(req.user.rol == 'cliente'){
        next()
    }
    else{
        res.redirect('/')
    }
}

router.get('/', estaLogueado, esCliente, async (req, res) => {
    ventaController.delete()
    const productos = await productModel.get()
    for(var i = 0; i< productos.length; i++){
        var obj = productos[i]
        var id = obj.idBusiness
        var empresa = await userModel.find(id)
        productos[i].empresa = empresa[0].name
    }
    const empresas = await productModel.getEmpresa()
    console.log(empresas)
    res.render('./cliente/index', {productos: productos,empresas})
})

router.post('/quitarDetalle/:id', estaLogueado, esCliente, ventaController.deleteDetail)

router.get('/perfil', estaLogueado, esCliente, (req, res) => {
    res.render('./cliente/perfil')
})

router.post('/buscar', estaLogueado, esCliente, async (req, res) => {
    console.log('Params ',req.body)
    res.redirect('/cliente/')
})
router.post('/add', estaLogueado, esCliente, ventaController.insertDetalle)

router.post('/compra', estaLogueado, esCliente, (req, res) => {
    ventaController.insertCompra(session.user.idUser, req.body.idSale, req.body.cost)
    req.flash('success','Se ha registrado su compra, en un momento le llegara informacion de su pedido')
    res.redirect('/cliente/cart')
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
    const empresas = await productModel.getEmpresa()
    if(detalles[0]){
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
        res.render('./cliente/index', {productos: productos,detalles: detalles,total: total,idSale: idSale,empresas})
    }
    else{
        res.render('./cliente/index', {productos: productos,empresas})
    }
})

module.exports = router