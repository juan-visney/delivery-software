const model = require('../models/user')
const path = require('path')
const controller = {}

controller.list = async (req, res) => {
    const admins = await model.get()
    console.log(admins)
}

controller.getName = async (id) => {
    const data = await model.getName(id)
    return data
}

controller.insertBusiness = async (req, res) => {
    const {user, pass, name, mail, photo, phone,rol} = req.body
    const newBusiness = {user, pass, name, mail, photo, phone, rol}
    try{
        var inserted = await model.insert(newBusiness)
        if(inserted === 'error'){
            res.send('error')
        }
        else{
            req.flash('success','Se ha creado cuenta empresa ' + newBusiness.name)
            res.redirect('/perfilAdmin')
        }
    }
    catch(error){

    }
}
controller.insertDelivery = async (req, res) => {
    const {user, pass, name, photo, phone,rol} = req.body
    const newDelivery = {user, pass, name, photo, phone, rol}
    try{
        var inserted = await model.insert(newDelivery)
        if(inserted === 'error'){
            res.send('error')
        }
        else{
            req.flash('success','Se ha creado cuenta delivery '+newDelivery.name)
            res.redirect('/perfilAdmin')
        }
    }
    catch(error){

    }
}
module.exports = controller