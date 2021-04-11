const jwt = require('jsonwebtoken');
const secret = "pass";

function setCookie(req, res, user) {
    let options = {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
        signed: false
    }

    const token = jwt.sign({  exp: Math.floor(Date.now() / 1000) + (60 * 60),  data: user}, secret);
    res.cookie('clientCookie', token, options)
}

function readCookie(req, cb) {
    const token = req.cookies.clientCookie;
    jwt.verify(token, secret, (err, verifiedJwt) => {
        if (err) {
            cb(false);
        } else {
            const data = verifiedJwt.data;
            cb(data);
        }
    })
}

function deleteCookie(req, res){
    res.cookie('clientCookie', { exp: Date.now() });
}

module.exports = {
    setCookie: setCookie,
    readCookie: readCookie,
    deleteCookie: deleteCookie
}