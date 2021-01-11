const express = require('express')
const router = express.Router()
const {estaLogueado, noestaLogueado} = require('../config/authentication')
const userModel = require('../models/user')
const deliveryController = require('../controllers/deliveryController')
const productController = require('../controllers/productoController')
const session = require('express-session')

function esDelivery(req, res, next){
    if(req.user.rol == 'repartidor'){
        next()
    }
    else{
        res.redirect('/')
    }
}
router.get('/perfil', estaLogueado, esDelivery, async(req, res) => {
    const id = session.user.idUser
    const delivery = await userModel.find(id)
    const ventas = await productController.getVentasDelivery(delivery[0].idUser)
    console.log(ventas)
    res.render('./delivery/perfil',{delivery: delivery[0],ventas})
})
router.get('/', estaLogueado, esDelivery, async (req, res) => {
    const pedidos = await deliveryController.getPedido()
    res.render('./delivery/index', {pedidos})
})

router.post('/anuncio', estaLogueado, esDelivery, deliveryController.anuncio)

router.post('/pedido', estaLogueado, esDelivery, deliveryController.insertPedido)

module.exports = router