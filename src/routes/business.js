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
router.get('/perfil', estaLogueado, esEmpresa, async(req, res) => {
    const id = session.user.idUser
    const empresa = await userModel.find(id)
    const ventas = await productController.getVentas(empresa[0].idUser)
    res.render('./empresa/perfil',{empresa: empresa[0],ventas})
})
router.post('/editar', estaLogueado, esEmpresa, userController.editarEmpresa)

router.get('/', estaLogueado, esEmpresa, async (req, res) => {
    const id = session.user.idUser
    const estado = 'activo'
    const productos = await productModel.findActivo(id, estado);
    const empresa = await userModel.find(id)
    empresa[0].idUser = empresa[0].idUser.toString()
    for(var i=0;i<productos.length;i++){
        productos[i].idUser = empresa[0].idUser
    }
    console.log(empresa[0])
    res.render('./empresa/index', {empresa: empresa[0],productos: productos})
})
router.post('/editarMenu/:id', estaLogueado, esEmpresa, productController.editProduct)

router.post('/quitarProducto/:id', estaLogueado, esEmpresa, productController.deleteProduct)

router.post('/crearMenu', estaLogueado, esEmpresa, productController.insertProduct)

module.exports = router