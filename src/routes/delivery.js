const express = require('express')
const router = express.Router()
const {estaLogueado, noestaLogueado} = require('../config/authentication')
const userController = require('../controllers/userController')
const deliveryController = require('../controllers/deliveryController')
const ventaController = require('../controllers/ventaController')
const session = require('express-session')
const twi = require('../config/twilio')

function esDelivery(req, res, next){
    if(req.user.rol == 'repartidor'){
        next()
    }
    else{
        res.redirect('/')
    }
}

router.get('/', estaLogueado, esDelivery, async (req, res) => {
    const pedidos = await deliveryController.getPedido()
    res.render('./delivery/index', {pedidos})
})

router.post('/anuncio', estaLogueado, esDelivery, async (req, res) => {
    const nombreDelivery = await userController.getName(session.user.idUser)
    const number = req.body.numero
    var mensaje = 'Hola tu pedido ya viene en camino\nLo esta traendo el delivery: '+nombreDelivery[0].name+'\nEl detalle del pedido es el siguiente: \n'
    mensaje = mensaje + await ventaController.aviso(req.body.idSale)
    mensaje = mensaje + 'Con un costo total de '+req.body.costo
    twi.init(number, mensaje)
    res.redirect('/')
})

module.exports = router