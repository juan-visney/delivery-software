const pool = require('../database')
const helpers = require('../config/helpers')

const model = {}

model.get = async() => {
    data = await pool.query('select * from usuario')
    return data
}
model.editEmpresa = async(empresa) => {
    data = await pool.query('update usuario set name = ?, user = ?, pass = ?, address = ?, photo = ?, rol = ? where idUser = ?',[empresa.name, empresa.user, empresa.pass, empresa.address, empresa.photo, empresa.rol, empresa.idUser])
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
model.cambio = async(id, estado) => {
    data = await pool.query('update usuario set estado = ? where idUser = ?', [estado, id]);
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
model.getDatos = async(rol) => {
    data = await pool.query('select * from usuario where rol = ?', [rol])
    return data
}
model.usuarios = async(idSale) => {
    data = await pool.query('select DISTINCT u.phone, u.name, u.idUser from usuario u, detalle d, producto p where d.idSale = ? and p.idProduct = d.idProduct and u.idUser = p.idBusiness',[idSale])
    return data
}
model.solicitud = async(sol) => {
    data = await pool.query('insert into solicitud set ?',[sol])
    return data
}
module.exports = model