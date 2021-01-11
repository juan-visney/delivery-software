const pool = require('../database')
const helpers = require('../config/helpers')

const model = {}

model.getPedidos = async() => {
    const estado = 'activo'
    data = await pool.query('select * from venta where estado = ?',[estado])
    return data
}
model.enProceso = async(idSale) => {
    const estado = 'espera'
    data = await pool.query('UPDATE venta SET estado = ? where idSale = ?',[estado, idSale])
}
model.entregado = async(idSale) => {
    const estado = 'entregado'
    data = await pool.query('UPDATE venta SET estado = ? where idSale = ?',[estado, idSale])
}
model.find = async(idUser) => {
    data = await pool.query('select * from usuario where idUser = ?',[idUser])
    return data
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