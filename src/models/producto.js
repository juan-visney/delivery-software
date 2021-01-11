const pool = require('../database')

const model = {}
model.getEmpresa = async() => {
    const rol = 'empresa'
    data = await pool.query('select distinct * from usuario where rol = ?', [rol])
    return data
}
model.get = async() => {
    const estado = 'activo'
    data = await pool.query('select * from producto where estado = ?',[estado])
    return data
}
model.delete = async(estado, id) => {
    data = await pool.query('UPDATE producto SET estado = ? WHERE idProduct = ?', [estado, id])
    return data
}
model.findActivo = async(idUser,estado) => {
    data = await pool.query('select * from producto where idBusiness = ? and estado = ?',[idUser,estado])
    return data
}

model.find = async(idUser) => {
    const estado = 'activo'
    data = await pool.query('select * from producto where idBusiness = ? and estado = ?',[idUser,estado])
    return data
}
model.getId = async(user) => {
    data = await pool.query('select * from producto p, usuario u where u.name = ? and u.idUser = p.idBusiness',[user])
    return data
}
model.getVentas = async(idUser) => {
    data = await pool.query('select w.name as cliente, v.cost as costo, FROM_UNIXTIME(UNIX_TIMESTAMP(v.date)) as fecha, p.name as producto, d.lot as cant from detalle d,producto p, venta v, usuario u, usuario w where u.idUser = ? and p.idBusiness = u.idUser and d.idProduct = p.idProduct and v.idSale = d.idSale and v.idClient = w.idUser',[idUser])
    return data
}
model.getVentasDelivery = async(idUser) => {
    data = await pool.query('select w.name as empresa, FROM_UNIXTIME(UNIX_TIMESTAMP(v.date)) as fecha, p.name as producto, u.name as cliente from producto p, venta v, detalle d, usuario u, usuario w, usuario x, orden o where x.idUser = ? and u.idUser = o.idClient and d.idSale = o.idSale and p.idProduct = d.idProduct and w.idUser = p.idBusiness',[idUser])
    return data
}
model.findByUser = async(User) => {
    const estado = 'activo'
    data = await pool.query('select * from producto where name = ? and estado = ?',[User, estado])
    return data
}
model.getName = async(id) => {
    const estado = 'activo'
    data = await pool.query('select name from producto where idProduct = ? and estado = ?', [id, estado])
    return data
}
model.getAll = async(id) => {
    const estado = 'activo'
    data = await pool.query('select * from producto where idProduct = ? and estado = ?', [id, estado])
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
model.update = async(producto) => {
    try{
        return await pool.query('UPDATE producto SET name = ?, quantity = ?, '+
        'description = ?, price = ?, photo = ? where idProduct = ?',[producto.name, producto.quantity,
            producto.description, producto.price, producto.photo, producto.idProduct])
    }
    catch(error){
        return 'error'
    }
}
model.updateCant = async(idProduct,cant) => {
    try{
        return await pool.query('UPDATE producto SET quantity = ? where idProduct = ?',[cant, idProduct])
    }
    catch(error){
        return 'error'
    }
}
model.getProductosVenta = async(idBusiness, idSale) => {
    const estado = 'activo'
    data = await pool.query('select p.name, p.price, d.lot from producto p, detalle d where p.idBusiness = ? and p.idProduct = d.idProduct and d.idSale = ?',[idBusiness, idSale])
    return data
}
module.exports = model