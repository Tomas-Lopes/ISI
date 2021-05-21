const fs = require('fs');
const request = require('request');
const authDocument = require("../documents/arquiteto");

/*function sendDocument() {
// Where fileName is name of the file and response is Node.js Reponse. 
responseFile = (fileName, response) => {
    const filePath =  "../documents/câmara" // or any file format
  
    // Check if file specified by the filePath exists 
    fs.exists(filePath, function(exists){
        if (exists) {     
          // Content-type is very interesting part that guarantee that
          // Web browser will handle response in an appropriate manner.
          response.writeHead(200, {
            "Content-Type": "application/octet-stream",
            "Content-Disposition": "attachment; filename=" + fileName
          });
          fs.createReadStream(filePath).pipe(response);
        } else {
          response.writeHead(400, {"Content-Type": "text/plain"});
          response.end("ERROR File does not exist");
        }
      });
    }
}
*/

function sendPdf (req, res) {

  var donneRecu = req.body;

  console.log(donneRecu['lien']);

  var url = donneRecu['lien']; //pdf link

  http.get(url, function(response) {

      var chunks = [];

      response.on('data', function(chunk) {

          console.log('downloading');

          chunks.push(chunk);

      });

      response.on("end", function() {
          console.log('downloaded');
          var jsfile = new Buffer.concat(chunks).toString('base64');
          console.log('converted to base64');
          res.header("Access-Control-Allow-Origin", "*");
          res.header("Access-Control-Allow-Headers", "X-Requested-With");
          res.header('content-type', 'application/pdf');
          res.send(jsfile);
      });
  }).on("error", function() {
      callback(null);
  }); 
}

module.exports = {
  sendPdf: sendPdf
}