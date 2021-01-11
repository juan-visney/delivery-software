const express = require('express')
const router = express.Router()
const {estaLogueado, noestaLogueado} = require('../config/authentication')
const userController = require('../controllers/userController')
const userModel = require('../models/user')
const productModel = require('../models/producto')
const productController = require('../controllers/productoController')
const session = require('express-session')

function esAdmin(req, res, next){
    if(req.user.rol == 'admin'){
        next()
    }
    else{
        res.redirect('/')
    }
}
router.get('/perfil', estaLogueado, esAdmin, (req, res) => {
    res.render('./empresa/perfil')
})
router.get('/', estaLogueado, esAdmin, async (req, res) => {
    const empresa = await userModel.getDatos('empresa')
    const delivery = await userModel.getDatos('repartidor')
    res.render('./administrador/index', {empresa, delivery})
})

router.get('/solicitudes', estaLogueado, esAdmin, userController.verSolicitud)

router.post('/cambiar/:id', estaLogueado, esAdmin, userController.cambiar)

module.exports = router