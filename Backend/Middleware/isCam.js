const clientCookie = require("../Config/cookie");
module.exports = function (req, res, next) {
    clientCookie.readCookie(req, function (cb){
        if (cb) {
            if (cb.cargo!="camara") {                
                return res.send("Nao es um camara")
            }
            return next();      
        } else {
            return res.status(400).send("User nao esta logado");
        }
    })
}