const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const pool = require('../database')
const helpers = require('./helpers')
const adminModel = require('../models/user')
const session = require('express-session');

passport.use('local.login', new localStrategy({
    usernameField: 'user',
    passwordField: 'pass',
    passReqToCallback: true
}, async(req, user, pass, done) => {
    const row = await adminModel.findByUser(user)
    if(row.length > 0){
        const usuario = row[0]
        const validPass = await helpers.decrypt(pass, usuario.pass)
        if(validPass){
            session.user = usuario
            done(null, usuario, req.flash('success', 'Bienvenido '+usuario.name))
        }
        else{
            done(null, false, req.flash('message', 'Error en la contraseña'))
        }
    }
    else{
        return done(null, false, req.flash('message', "El usuario no existe"))
    }
}))

passport.use('local.registro', new localStrategy({
    usernameField: 'user',
    passwordField: 'pass',
    passReqToCallback: true
}, async (req, user, pass, done) => {
    console.log(req.body)
    if(req.body.rol == 'admin'){
        const name = req.body.name
        const mail = req.body.mail
        const rol = req.body.rol
        const newAdmin = {
            user: user,
            pass: pass,
            name: name,
            mail: mail,
            rol: rol
        }
        const result = await adminModel.insert(newAdmin)
        newAdmin.idUser = result.insertId
        session.usuario = newAdmin
        return done(null, newAdmin);
    }
    if(req.body.rol == 'cliente'){
        const name = req.body.name
        const rol = req.body.rol
        const phone = req.body.phone
        const address = req.body.address
        const newClient = {
            user: user,
            pass: pass,
            name: name,
            rol: rol,
            phone,
            address
        }
        const result = await adminModel.insert(newClient)
        newClient.idUser = result.insertId
        return done(null, newClient);
    }
}))

passport.serializeUser((user, done) => {
    done(null, user.idUser)
})

passport.deserializeUser(async (id, done) => {
    const row = await pool.query('select * from usuario where idUser = ?',[id])
    done(null, row[0])
})