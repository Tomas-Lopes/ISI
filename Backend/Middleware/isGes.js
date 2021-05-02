const clientCookie = require("../Config/cookie");
module.exports = function (req, res, next) {
    clientCookie.readCookie(req, function (cb){
        if (cb) {
            if (cb.cargo!="gestor") {                
                return res.send("Nao es um gestor")
            }
            return next();      
        } else {
            return res.status(400).send("User nao esta logado");
        }
    })
}