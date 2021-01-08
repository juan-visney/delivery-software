const express = require('express')
const router = express.Router()
const {estaLogueado, noestaLogueado} = require('../config/authentication')
const userController = require('../controllers/userController')
const userModel = require('../models/user')
const productModel = require('../models/producto')
const productController = require('../controllers/productoController')
const session = require('express-session')

function esEmpresa(req, res, next){
    if(req.user.rol == 'empresa'){
        next()
    }
    else{
        res.redirect('/')
    }
}
router.get('/perfil', estaLogueado, esEmpresa, (req, res) => {
    res.render('./empresa/perfil')
})
router.get('/', estaLogueado, esEmpresa, async (req, res) => {
    const id = session.user.idUser
    
    const productos = await productModel.find(id);
    const empresa = await userModel.find(id)
    res.render('./empresa/index', {empresa: empresa[0],productos: productos})
})

router.post('/crearMenu', estaLogueado, esEmpresa, productController.insertProduct)

module.exports = router