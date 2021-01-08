const pool = require('../database')

const model = {}
model.getById = async(id) => {
    data = await pool.query('select * from detalle where idSale = ?',[id])
    return data
}
model.getById1 = async(id) => {
    data = await pool.query('select * from detalle as producto where idSale = ?',[id])
    return data
}
model.deleteDetail = async(id) => {
    try{
        return await pool.query('delete from detalle where idDetail = ?', [id])
    }
    catch(error){
        return 'error'
    }
}
model.find = async() => {
    data = await pool.query('select max(idSale) as id from detalle')
    return data
}
model.getNumberVenta = async() => {
    data = await pool.query('select max(idSale) as id from venta')
    return data
}
model.insertDetalle = async(detalle) => {
    try{
        return await pool.query('insert into detalle set ?', [detalle])
    }
    catch(error){
        return 'error'
    }
}
model.insertVenta = async(venta) => {
    try{
        return await pool.query('insert into venta set ?', [venta])
    }
    catch(error){
        return 'error'
    }
}

module.exports = model