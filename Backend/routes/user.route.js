const jsonMessagesPath = __dirname + "/../assets/jsonMessages/";
const jsonMessages = require(jsonMessagesPath + "login");

const user = require('express').Router();
const userController = require('../controllers/user.controller');

//const { adminFb } = require('../config/firebaseConfig');

user.put('/edit', isUser, userController.edit);
//user.post('/recoverPassword', userController.recoverPassword);
//user.put('/changeEmail', isUser, userController.changeEmail);
//user.put('/changePhone', isUser, userController.changePhone);
//user.put('/changePassword', isUser, userController.changePassword);
user.delete('/delete/me', isUser, userController.deleteMe);
user.get('/notifications', isUser, userController.getNotifications);
user.put('/read/notification', isUser, userController.readNotification);

//comparar com o trabalho de PW
function isUser(req, res, next) {
    var sessionCookie = req.cookies.session || '';

    adminFb.auth().verifySessionCookie(sessionCookie, true).then(decodedClaims => {
        if (!decodedClaims.admin && !decodedClaims.camara && !decodedClaims.empresa) {
            res.redirect('/denied');
        }
        else {
            next();
        }
    }).catch(() => {
        res.redirect('/denied');
    })
}

module.exports = user;