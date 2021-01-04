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
model.insert = async(producto) => {
    try{
        return await pool.query('insert into producto set ?', [producto])
    }
    catch(error){
        return 'error'
    }
}
module.exports = model