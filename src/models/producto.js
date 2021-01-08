const pool = require('../database')

const model = {}

model.get = async() => {
    data = await pool.query('select * from producto')
    return data
}
model.find = async(idUser) => {
    data = await pool.query('select * from producto where idBusiness = ?',[idUser])
    return data
}
model.getId = async(user) => {
    data = await pool.query('select * from producto p, usuario u where u.name = ? and u.idUser = p.idBusiness',[user])
    return data
}
model.findByUser = async(User) => {
    data = await pool.query('select * from producto where name = ?',[User])
    return data
}
model.getName = async(id) => {
    data = await pool.query('select name from producto where idProduct = ?', [id])
    return data
}
model.getAll = async(id) => {
    data = await pool.query('select * from producto where idProduct = ?', [id])
    return data
}
model.insert = async(producto) => {
    try{
        return await pool.query('insert into producto set ?', [producto])
    }
    catch(error){
        return 'error'
    }
}
module.exports = model