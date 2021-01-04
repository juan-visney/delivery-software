const model = require('../models/producto')
const controller = {}

controller.showProduct = async (req, res) => {

}

controller.insertProduct = async (req, res) => {
    console.log(req.body)
    const {name, idBusiness, quantity, price, description, photo} = req.body
    const newProduct = {name, idBusiness, quantity, price, description, photo}
    try{
        console.log(newProduct)
        var inserted = await model.insert(newProduct)
        if(inserted === 'error'){
            res.send('error')
        }
        else{
            req.flash('success','Se ha agregado el producto ' + newProduct.name + ' al menu')
            res.redirect('/empresa/')
        }
    }
    catch(error){

    }
}
module.exports = controller