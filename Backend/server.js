// config 
/*const serverConfig = require("./serverConfig.json");

const host = process.env.HOST || serverConfig.serverHost;
const port = process.env.PORT || serverConfig.serverHost;

const express = require("express");

const app = express();

app.listen(port, function (err)
{
    if (!err){
        console.log('Servidor no Host ' + host + ' @ Port ' + port );
    }
    else {
        console.log(err);
    }
})

module.exports = app;+
require('./loader.js')*/

const http = require('http')
const port = 3000

const server = http.createServer(function(req, res)
{

})

server.listen(port, function(error)
{
    if (error)
    {
        console.log('fodeu', error)
    } else {
        console.log('Server is listening on port ' + port)
    }
})
