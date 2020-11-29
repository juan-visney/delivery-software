const model = require('../models/admin')
const controller = {}

controller.store = async (req, res,done) => {
    const {user, pass, fullname, mail} = req.body
    const newAdmin = {
        user: user,
        pass: pass,
        fullname: fullname,
        mail: mail
    }
    const result = await adminModel.insert(newAdmin)
    return result
}

module.exports = controller