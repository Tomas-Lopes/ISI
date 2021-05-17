let {google}=require("googleapis");
let path = require('path');

let {authenticate} = require('@google-cloud/local-auth');
let fs = require('fs');
let readline = require('readline');
let credentials={
  installed: {
      client_id: "993016191366-3tndakb0dcmiofe9kgi9crmngoipjrh9.apps.googleusercontent.com",
      project_id: "turing-micron-312116",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_secret: "JXIrxCTLyCOOs2mHjFzF27nj",
      redirect_uris: [
          "http://localhost:5500"
      ]
  }
};


// If modifying these scopes, delete token.json.
let SCOPES = ['https://www.googleapis.com/auth/documents'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
let TOKEN_PATH = 'token.json';

// Load client secrets from a local file.
/*fs.readFile('credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Docs API.
  authorize(JSON.parse(content), printDocTitle);
});*/

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback) {
  let {client_secret, client_id, redirect_uris} = credentials.installed;
  let oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getNewToken(oAuth2Client, callback) {
  let authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  let rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Prints the title of a sample doc:
 * https://docs.google.com/document/d/195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth 2.0 client.
 */
function printDocTitle(auth) {
  let docs = google.docs({version: 'v1', auth});
  docs.documents.get({
    documentId: '195j9eDD3ccgjQRttHhJPymLJUCOUjs-jmwTrekvdjFE',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    console.log(`The title of the document is: ${res.data.title}`);
  });
}

async function inserirDados(req,res){

  authorize(credentials,(auth)=>{
    console.log(res.body);
    let orcamentoArquiteto = req.body.orcamentoArquiteto;
    let area = req.body.area;
  let requests = [
       {
    replaceAllText: {
      containsText: {
        text: '{{orcamentoArquiteto}}',
        matchCase: true,
      },
      replaceText: orcamentoArquiteto,
    },
  },
    {
    replaceAllText: {
      containsText: {
        text: ' {{area}}',
        matchCase: true,
      },
      replaceText: area,
    },
  },
  ];
 /* var data = new Date(),
  dia = data.getDate().toString(),
  diaNow = (dia.length == 1) ? '0' + dia : dia,
  mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
  mesNow = (mes.length == 1) ? '0' + mes : mes,
  anoNow = data.getFullYear(),
  mesExtenso = mesNow;

for (var i = 1; i < 13; i++) {
  var nome = ['Janeiro', 'Feveiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
  if (mesExtenso.includes(i.toString())) {
      mesExtenso = nome[i - 1];
  }
}*/

  google.options({auth: auth});
  google
      .discoverAPI(
          'https://docs.googleapis.com/$discovery/rest?version=v1&key=AIzaSyDRUuqylN2af7ZZtOQxBMMbLm8kJ5WTvEI')
      .then(function(docs) {
        docs.documents.batchUpdate(
            {
              documentId: '148fCpUJj3SSTAaXWgKbI1tssYpELeEgDWLVLSvq_ldU',
              resource: {
                requests,
              },
            },
            (err, data) => {
              console.log("1");
              if (err) return console.log('The API returned an error: ' + err);
              console.log(data);
              res.send(JSON.stringify({status:"sucess"}))
            });
      })
  });


} 





module.exports={
    
    inserirDados:inserirDados
}