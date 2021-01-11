const express = require('express')
const router = express.Router()
const passport = require('passport')
const {estaLogueado, noestaLogueado} = require('../config/authentication')
const userController = require('../controllers/userController')
const session = require('express-session')

router.post('/solicitud', noestaLogueado, userController.solicitud)
router.get('/solicitud', noestaLogueado, (req, res) => {
    res.render('./authentication/solicitud')
})
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
router.post('/registroAdmin', estaLogueado, passport.authenticate('local.registro', {
        successRedirect: '/administrador/',
        failureRedirect: '/registroAdmin',
        failureFlash: true
}))
router.post('/registroBusiness', estaLogueado, userController.insertBusiness)
router.post('/registroDeliver', estaLogueado, userController.insertDelivery)
router.post('/registroClient', noestaLogueado, passport.authenticate('local.registro', {
        successRedirect: '/cliente/',
        failureRedirect: '/registroCliente',
        failureFlash: true
}))
router.get('/login', noestaLogueado, (req, res) => {
    res.render('./authentication/login')
})
router.get('/inicio', estaLogueado, (req, res) => {
    req.flash('success', 'Bienvenido '+session.user.name)
    if(session.user.rol == 'admin'){
        res.redirect('/administrador/')
    }
    else if(session.user.rol == 'empresa'){
        res.redirect('/empresa/')
    }
    else if(session.user.rol == 'cliente'){
        res.redirect('/cliente')
    }
    else if(session.user.rol == 'repartidor'){
        res.redirect('/delivery/')
    }
})
router.post('/login', noestaLogueado, (req, res, next) => {
    passport.authenticate('local.login',{
        successRedirect: '/inicio',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next)
})
router.get('/salir', estaLogueado, (req, res) => {
    req.logOut()
    res.redirect('/login')
})
module.exports = router