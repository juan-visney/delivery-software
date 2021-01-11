const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const pool = require('../database')
const helpers = require('./helpers')
const model = require('../models/user')
const session = require('express-session');

passport.use('local.login', new localStrategy({
    usernameField: 'user',
    passwordField: 'pass',
    passReqToCallback: true
}, async(req, user, pass, done) => {
    const row = await model.findByUser(user)
    if(row.length > 0){
        const usuario = row[0]
        if(usuario.estado == 'activo'){
            const validPass = await helpers.decrypt(pass, usuario.pass)
            if(validPass){
                session.user = usuario
                done(null, usuario)
            }
            else{
                done(null, false, req.flash('message', 'Error en la contraseña'))
            }
        }
        else{
            done(null, false, req.flash('message', 'Esta bloqueado temporalmente, comuniquese con el administrador'))
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
    if(req.body.rol == 'admin'){
        const name = req.body.name
        const mail = req.body.mail
        const rol = req.body.rol
        const estado = 'activo'
        const newAdmin = {
            user: user,
            pass: pass,
            name: name,
            mail: mail,
            rol: rol, 
            estado
        }
        const result = await model.insert(newAdmin)
        newAdmin.idUser = result.insertId
        session.user = newAdmin
        return done(null, newAdmin);
    }
    if(req.body.rol == 'cliente'){
        const name = req.body.name
        const rol = req.body.rol
        const phone = req.body.phone
        const address = req.body.address
        const estado = 'activo'
        const newClient = {
            user: user,
            pass: pass,
            name: name,
            rol: rol,
            phone,
            address, 
            estado
        }
        const result = await model.insert(newClient)
        newClient.idUser = result.insertId
        session.user = newClient
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