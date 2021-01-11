const { session } = require('passport')
const { format } = require('timeago.js')

const helpers = {}

helpers.timeago = (timestamp) => {
    return format(timestamp)
}
helpers.esAdmin = (user) =>{
    return user.rol == 'admin'
}
helpers.esEmpresa = (user) =>{
    return user.rol == 'empresa'
}
helpers.esCliente = (user) =>{
    return user.rol == 'cliente'
}
helpers.esDelivery = (user) =>{
    return user.rol == 'repartidor'
}

module.exports = helpers