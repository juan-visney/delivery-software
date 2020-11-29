const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const pool = require('../database')
const helpers = require('../config/helpers')
const adminModel = require('../models/admin')

//admin
passport.use('local.loginAdmin', new localStrategy({
    usernameField: 'user',
    passwordField: 'pass',
    passReqToCallback: true
}, async(req, user, pass, done) => {
    const row = await adminModel.findByUser(user)
    if(row.length > 0){
        const usuario = row[0]
        const validPass = await helpers.decrypt(pass, usuario.pass)
        if(validPass){
            done(null, usuario, req.flash('success', 'Bienvenido '+usuario.fullname))
        }
        else{
            done(null, false, req.flash('message', 'Error en la contraseña'))
        }
    }
    else{
        return done(null, false, req.flash('message', "El usuario no existe"))
    }
}))
passport.use('local.registroAdmin', new localStrategy({
    usernameField: 'user',
    passwordField: 'pass',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const fullname = req.body.fullname
    const mail = req.body.mail
    const newAdmin = {
        user: username,
        pass: password,
        fullname: fullname,
        mail: mail
    }
    const result = await adminModel.insert(newAdmin)
    newAdmin.id = result.insertId
    return done(null, newAdmin);
}))

passport.serializeUser((user, done) => {
    done(null, user.idAdmin)
})

passport.deserializeUser(async (id,done) => {
    const row = await pool.query('select * from admin where idAdmin = ?',[id])
    done(null, row[0])
})