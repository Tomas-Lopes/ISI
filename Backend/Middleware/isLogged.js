const clientCookie = require("../Config/cookie");
module.exports = function (req, res, next) {
    clientCookie.readCookie(req, function (cb){
        if (cb) {
            console.log(cb)
            return next();      
        } else {
            return res.status(400).send("User nao esta logado");
        }
    })
}