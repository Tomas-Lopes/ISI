const req = require('request');
const querystring = require('querystring');

function getToken(callback) {
  let options = {
    url: `https://api.moloni.pt/v1/grant/?grant_type=password&client_id=buildhelper2021&client_secret=7def1d3f4e0cb75e6ae55269dc71a6552f6ca1a1&username=jucaamaral2000@gmail.com&password=rumoao20`
  }
  req.get(options, (err, res) => {
    if (!err && res.statusCode == 200) {
      callback({
        'access_token': JSON.parse(res.body).access_token
      });
      console.log("Token:" +  JSON.parse(res.body).access_token);
    } else {
      callback({
        'statusCode': res.statusCode,
        'body': JSON.parse(res.body)
      });
    }
  })
}

function getAllDocuments (callback) {
    let options = {
        url: `https://api.moloni.pt/v1/grant/?grant_type=password&client_id=buildhelper2021&client_secret=7def1d3f4e0cb75e6ae55269dc71a6552f6ca1a1&username=jucaamaral2000@gmail.com&password=rumoao20`
      }


}

function getPDFLink(document_id, callback) {
    getCompany((res) => {
        if (res.company_id) {
            const company_id = res.company_id;
            const access_token = res.access_token;

            let json = querystring.stringify({
                company_id: company_id,
                document_id: document_id
            });
            let options = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: `https://api.moloni.pt/v1/documents/getPDFLink/?access_token=${access_token}`,
                body: json
            }
            req.post(options, (err, res) => {
                if (!err && res.statusCode == 200) {
                    callback({
                        'statusCode': res.statusCode,
                        'body': res.body
                    });
                } else {
                    callback({
                        'statusCode': res.statusCode,
                        'body': JSON.parse(res.body)
                    });
                }
            })
        } else {
            callback({
                'statusCode': res.statusCode,
                'body': res.body
            });

        }
    })
}

function getCompany(callback) {
    getToken((res) => {
        if (res.access_token) {
            const access_token = res.access_token;
            let options = {
                url: `https://api.moloni.pt/v1/companies/getAll/?access_token=${access_token}`
            }
            req.get(options, (err, res) => {
                if (!err && res.statusCode == 200) {
                    let resBody = JSON.parse(res.body);
                    let company_id = -1;
                    for (let i = 0; i < resBody.length; i++) {
                        if (resBody[i].email == process.env.EMAIL_USERNAME) {
                            company_id = resBody[i].company_id;
                        }
                    }
                    if (company_id != -1) {
                        callback({
                            'company_id': company_id,
                            'access_token': access_token
                        });
                    } else {
                        callback({
                            'statusCode': 404,
                            'body': {
                                'message': 'Company not found'
                            }
                        });
                    }
                } else {
                    callback({
                        'statusCode': res.statusCode,
                        'body': JSON.parse(res.body)
                    });
                }
            })
        } else {
            callback({
                'statusCode': res.statusCode,
                'body': res.body
            });
        }
    })
}

module.exports = {
    getToken: getToken,
    getPDFLink: getPDFLink
};