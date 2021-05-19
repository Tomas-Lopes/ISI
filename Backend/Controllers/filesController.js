const fs = require('fs');
const request = require('request');
const authDocument = require("../documents/arquiteto");

function sendDocument() {
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