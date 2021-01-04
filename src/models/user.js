const pool = require('../database')
const helpers = require('../config/helpers')

const model = {}

model.get = async() => {
    data = await pool.query('select * from usuario')
    return data
}
model.find = async(idUser) => {
    data = await pool.query('select * from usuario where idUser = ?',[idUser])
    return data
}
model.findByUser = async(user) => {
    data = await pool.query('select * from usuario where user = ?', [user]);
    return data;
}
model.insert = async(usuario) => {
    try{
        pass = await helpers.encrypt(usuario.pass)
        usuario.pass = pass
        return await pool.query('insert into usuario set ?', [usuario])
    }
    catch(error){
        return 'error'
    }
}
module.exports = model