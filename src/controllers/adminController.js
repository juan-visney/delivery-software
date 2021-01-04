const model = require('../models/admin')
const controller = {}

controller.list = async (req, res) => {
    const admins = await model.get()
    console.log(admins)
}

module.exports = controller