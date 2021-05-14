const req = require('request');
const querystring = require('querystring');

var company_id = 126979;

function login(callback) {
    let options = {
        url: `https://api.moloni.pt/v1/grant/?grant_type=password&client_id=buildhelper2021&client_secret=7def1d3f4e0cb75e6ae55269dc71a6552f6ca1a1&username=jucaamaral2000@gmail.com&password=rumoao20`
    }
    req.get(options, (err, res) => {
        if (!err && res.statusCode == 200) {
          console.log(res.statusCode);
            callback({
                'access_token': JSON.parse(res.body).access_token
            });
            console.log("Token:" +  JSON.parse(res.body).access_token);
        } else {
          console.log(res.statusCode);
            callback({
                'statusCode': res.statusCode,
                'body': JSON.parse(res.body)
            });
        }
    })
  }

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
        url: `https://api.moloni.pt/v1/grant/?grant_type=password&client_id=buildhelper2021&client_secret=7def1d3f4e0cb75e6ae55269dc71a6552f6ca1a1&username=buildhelper2021isi@gmail.com&password=rumoao20`
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
                        if (resBody[i].email == "buildhelper2021isi@gmail.com") {
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

function inserirDadosProjetos (dealId, res) {
    var options = {
        method: "GET",
        url: "https://api.hubapi.com/crm/v3/objects/deals/5103044940",
        qs: {
          archived: "false",
          hapikey: "ffdfdd87-f540-403c-8427-acc9eb296971",
        },
        headers: { accept: "application/json" },
      };

    request(options, async (error, resp) => {
        if (!error) {
          let pedido = JSON.parse(resp.body);
          let dados = pedido.properties;
    
          const id = {
            dealId: dados.hs_object_id,
          };
          const propriedades = {
            company_id: company_id,
            category_id: 2151197,
            type: 2,
            price: dados.amount,
            data: dados.closedate,
            name: dados.dealname,
            summary: dados.description,
            reference: dados.project_type,
            unit_id: 1076333,
            has_stock: 1,
            //exemption_reason: "M99",
            stock: 1,
            //address: dados.localizacao
            properties: [
                {
                    property_id: 11543,
                    value: "Suspenso"
                },
                {
                    property_id: 11633,
                    value: data
                },
                {
                    property_id: 11634,
                    value: address
                }
            ],
        }

        let moloniOptions = {
            headers: {
                'Content-Length': json.length,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            url: `https://api.moloni.pt/v1/products/insert/?access_token=${access_token}`,
            body: json
        }
        req.post(moloniOptions, (err, result) => {
            if (!err && result.statusCode == 200) {
                res.status(200).send(JSON.parse(params))
            } else {
                res.status(400).send("erro");
            }
        })
    } else {
        res.status(400).send("erro");
    }
})
}


module.exports = {
    login: login,
    getToken: getToken,
    getPDFLink: getPDFLink,
    inserirDadosProjetos: inserirDadosProjetos
};