const model = require('../models/user')
const helpers = require('../config/helpers')
const controller = {}

controller.getName = async (id) => {
    const data = await model.getName(id)
    return data
}

controller.insertBusiness = async (req, res) => {
    const estado = 'activo'
    const {user, pass, name, address, mail, photo, phone,rol} = req.body
    const newBusiness = {user, pass, name, address, estado, mail, photo, phone, rol}
    try{
        var inserted = await model.insert(newBusiness)
        if(inserted === 'error'){
            res.send('error')
        }
        else{
            req.flash('success','Se ha creado cuenta empresa ' + newBusiness.name)
            res.redirect('/administrador/')
        }
    }
    catch(error){

    }
}
controller.insertDelivery = async (req, res) => {
    const estado = 'activo'
    const {user, pass, name, photo, phone,rol} = req.body
    const newDelivery = {user, pass, name, estado, photo, phone, rol}
    try{
        var inserted = await model.insert(newDelivery)
        if(inserted === 'error'){
            res.send('error')
        }
        else{
            req.flash('success','Se ha creado cuenta delivery '+newDelivery.name)
            res.redirect('/administrador/')
        }
    }
    catch(error){

    }
}
controller.cambiar = async(req, res) => {
    const id = req.params.id
    try{
        var estado = 'inactivo'
        if(req.body.estado == 'inactivo')
            estado = 'activo'
        const up = await model.cambio(id, estado)
        req.flash('success','Se ha actualizado los datos')
        res.redirect('/administrador/')
    }
    catch(error){

    }
}
controller.verSolicitud = async (req, res) => {
    res.render('./administrador/solicitudes')
}
controller.editarEmpresa = async (req, res) => {
    if(req.body.photo == ''){
        req.body.photo = req.body.foto
    }
    passw = await helpers.encrypt(req.body.pass)
    req.body.pass = passw
    const {name, user, pass, address, photo, phone, rol, idUser}= req.body
    const upEmpresa = {name, user, pass, address, photo, phone, rol, idUser}
    await model.editEmpresa(upEmpresa)
    req.flash('success', 'Se actualizaron tus datos')
    res.redirect('/empresa/')
}
controller.usuarios = async (idSale) => {
    data = await model.usuarios(idSale)
    return data
}
controller.solicitud = async(req, res) => {
    const {name, address, phone, photo} = req.body
    const solicitud = {name, address, phone, photo}
    await model.solicitud(solicitud)
    req.flash('success', 'Se registro su solicitud')
    res.redirect('/login')
}
module.exports = controller