const pool = require('../database')
const helpers = require('../config/helpers')

const model = {}

model.get = async() => {
    data = await pool.query('select * from usuario')
    return data
}
model.getName = async(id) => {
    data = await pool.query('select name from usuario where idUser = ?',[id])
    return data
}
model.find = async(idUser) => {
    data = await pool.query('select * from usuario where idUser = ?',[idUser])
    return data
}
model.getPhoto = async (idUser) => {
    data = await pool.query('select photo from usuario where idUser = ?', [idUser]);
    return data;
}
model.getPhone = async (idUser) => {
    data = await pool.query('select phone from usuario where idUser = ?', [idUser]);
    return data;
}
model.findByName = async(name) => {
    data = await pool.query('select * from usuario where name = ?', [name]);
    return data;
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