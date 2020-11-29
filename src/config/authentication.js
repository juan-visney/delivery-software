module.exports = {
    estaLogueado(req, res, next) {
        if(req.isAuthenticated()){
            return next()
        }
        return res.redirect('/login')
    },
    noestaLogueado(req, res, next) {
        if(!req.isAuthenticated()){
            return next()
        }
        return res.redirect('/perfil')
    }
}