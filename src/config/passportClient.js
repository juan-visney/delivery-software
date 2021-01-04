const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const pool = require('../database')
const helpers = require('./helpers')
const clientModel = require('../models/client')

passport.use('local.loginClient', new localStrategy({
    usernameField: 'user',
    passwordField: 'pass',
    passReqToCallback: true
}, async(req, user, pass, done) => {
    const row = await clientModel.findByUser(user)
    if(row.length > 0){
        const usuario = row[0]
        const validPass = await helpers.decrypt(pass, usuario.pass)
        if(validPass){
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

passport.use('local.registroClient', new localStrategy({
    usernameField: 'user',
    passwordField: 'pass',
    passReqToCallback: true
}, async (req, user, pass, done) => {
    const name = req.body.name
    const phone = req.body.phone
    const address = req.body.address
    const newClient = {
        user: user,
        pass: pass,
        name: name,
        phone: phone,
        address: address
    }
    console.log(newClient)
    const result = await clientModel.insert(newClient)
    newClient.idUser = result.insertId
    return done(null, newClient);
}))

passport.serializeUser((user, done) => {
    done(null, user.idClient)
})

passport.deserializeUser(async (id, done) => {
    const row = await pool.query('select * from client where idClient = ?',[id])
    done(null, row[0])
})