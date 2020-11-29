const bcrypt = require('bcryptjs')
const helpers = {}

helpers.encrypt = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}
helpers.decrypt = async (password, savePass) => {
    return await bcrypt.compare(password,savePass)
}

module.exports = helpers