const pool = require('../database')
const helpers = require('../config/helpers')

const model = {}

model.get = async() => {
    data = await pool.query('select * from admin')
    return data
}
model.find = async(idAdmin) => {
    data = await pool.query('select * from admin where idAdmin = ?',[idAdmin])
    return data
}
model.findByUser = async(user) => {
    data = await pool.query('select * from admin where user = ?', [user]);
    return data;
}
model.insert = async(usuario) => {
    try{
        pass = await helpers.encrypt(usuario.pass)
        usuario.pass = pass
        return await pool.query('insert into admin set ?', [usuario])
    }
    catch(error){
        return 'error'
    }
}
module.exports = model