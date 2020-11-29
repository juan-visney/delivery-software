const express = require('express')
const router = express.Router()
const passport = require('passport')
const {estaLogueado, noestaLogueado} = require('../config/authentication')

router.get('/registro', noestaLogueado, (req, res) => {
    res.render('./authentication/registro')
})
router.post('/registro', noestaLogueado, passport.authenticate('local.registroAdmin', {
        successRedirect: '/perfil',
        failureRedirect: '/registro',
        failureFlash: true
}))
router.get('/login', noestaLogueado, (req, res) => {
    res.render('./authentication/login')
})
router.post('/login', noestaLogueado, (req, res, next) => {
    console.log(req.body)
    if(req.body.rol == 'Administrador'){
        passport.authenticate('local.loginAdmin', {
            successRedirect: '/perfil',
            failureRedirect: '/login',
            failureFlash: true
        })(req, res, next)
    }
})
router.get('/perfil', estaLogueado, (req, res) => {
    res.render('./administrador/perfil')
})
router.get('/salir', estaLogueado, (req, res) => {
    req.logOut()
    res.redirect('/login')
})
module.exports = router