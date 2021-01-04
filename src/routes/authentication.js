const express = require('express')
const router = express.Router()
const passport = require('passport')
const {estaLogueado, noestaLogueado} = require('../config/authentication')
const userController = require('../controllers/userController')

router.get('/registroAdmin', noestaLogueado, (req, res) => {
    res.render('./authentication/registroAdmin')
})
router.get('/registroBusiness', estaLogueado, (req, res) => {
    res.render('./authentication/registroEmpresa')
})
router.get('/registroDeliver', estaLogueado, (req, res) => {
    res.render('./authentication/registroRepartidor')
})
router.get('/registroClient', noestaLogueado, (req, res) => {
    res.render('./authentication/registroCliente')
})
router.post('/registroAdmin', noestaLogueado, passport.authenticate('local.registro', {
        successRedirect: '/perfilAdmin',
        failureRedirect: '/registroAdmin',
        failureFlash: true
}))
router.post('/registroBusiness', estaLogueado, userController.insertBusiness)
router.post('/registroDeliver', estaLogueado, userController.insertDelivery)
router.post('/registroClient', noestaLogueado, passport.authenticate('local.registro', {
        successRedirect: '/perfilClient',
        failureRedirect: '/registroCliente',
        failureFlash: true
}))
router.get('/login', noestaLogueado, (req, res) => {
    res.render('./authentication/login')
})
router.post('/login', noestaLogueado, (req, res, next) => {
    if(req.body.rol == 'Administrador'){
        passport.authenticate('local.login', {
            successRedirect: '/perfilAdmin',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next)
    }
    else if (req.body.rol == 'Empresa'){
        passport.authenticate('local.login', {
            successRedirect: '/empresa/',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next)
    }
    else if (req.body.rol == 'Delivery'){
        passport.authenticate('local.login', {
            successRedirect: '/perfilDeliver',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next)
    }
    else if (req.body.rol == 'Cliente'){
        passport.authenticate('local.login', {
            successRedirect: '/perfilClient',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next)
    }
})
router.get('/perfilAdmin', estaLogueado, (req, res) => {
    res.render('./administrador/perfil')
})
router.get('/perfilBusiness', estaLogueado, (req, res) => {
    res.render('./empresa/principal')
})
router.get('/perfilDeliver', estaLogueado, (req, res) => {
    res.render('./deliver/empresa/')
})
router.get('/perfilClient', estaLogueado, (req, res) => {
    res.render('./client/perfil')
})
router.get('/salir', estaLogueado, (req, res) => {
    req.logOut()
    res.redirect('/login')
})
module.exports = router