const request = require('request');
const querystring = require('querystring');
const con = require("../Config/ConnectionSF");

var company_id = 182994;

function getToken(callback) {
    let options = {
        url: `https://api.moloni.pt/v1/grant/?grant_type=password&client_id=buildhelper2021&client_secret=7def1d3f4e0cb75e6ae55269dc71a6552f6ca1a1&username=buildhelper2021isi@gmail.com&password=rumoao20`
    }
    request.get(options, (err, res) => {
        if (!err && res.statusCode == 200) {
            callback({
                'access_token': JSON.parse(res.body).access_token
            });
            console.log("Token:" + JSON.parse(res.body).access_token);
        } else {
            callback({
                'statusCode': res.statusCode,
                'body': JSON.parse(res.body)
            });
        }
    })
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
            request.get(options, (err, res) => {
                if (!err && res.statusCode == 200) {
                    let resBody = JSON.parse(res.body);
                    let company_id = -1;
                    for (let i = 0; i < resBody.length; i++) {
                        if (resBody[i].email == "buildhelper2021isi@gmail.com") {
                            company_id = resBody[i].company_id;
                            console.log(company_id)
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

async function inserirDadosProjetos(dealId, res) {
    const ID = await con.sobject("ProjetosARQ__c").findOne(
        {
            Dealname__c: dealId
        },
        {
            Amount__c: 1,
            Closedate__c: 1,
            Name: 1,
            Dealname__c: 1,
            Description__c: 1,
            TipoProjeto__c: 1,
            Localizacao__c: 1,
            Latitude__c: 1,
            Longitude__c: 1,
            URL__c: 1
        }
    );

    getCategory((result) => {
        if (result.company_id) {
            const company_id = result.company_id;
            const access_token = result.access_token;
            const category_id = result.category_id;
         
            let propriedades = {
                company_id: company_id,
                category_id: category_id,
                type: 2,
                name: ID.Name,
                reference: ID.Name,
                summary: ID.Description__c,
                price: ID.Amount__c,
                unit_id: 1595669,
                has_stock: 1,
                stock: 1,
                exemption_reason: 0,
                properties: [
                    {
                        property_id: 20872,
                        value: "Pendente"
                    },
                    {
                        property_id: 20886,
                        value: ID.Closedate__c
                    },
                    {
                        property_id: 20963,
                        value: ID.Localizacao__c
                    },
                    {
                        property_id: 20879,
                        value: ID.TipoProjeto__c
                    },
                    {
                        property_id: 20964,
                        value: ID.Latitude__c
                    },
                    {
                        property_id: 20971,
                        value: ID.Longitude__c
                    },
                    {
                        property_id: 21216,
                        value: ID.URL__c
                    }
                ],
            };

            let moloniOptions = {
                headers: {
                    //'Content-Length': propriedades.length,
                    'Content-Type': 'application/json'
                },
                url: `https://api.moloni.pt/v1/products/insert/?access_token=${access_token}`,
                body: propriedades,
            }
            console.log(moloniOptions)
            request.post(moloniOptions, (err, result) => {
                console.log(result.statusCode)
                if (!err && result.statusCode == 200) {
                    res.status(200).send(JSON.parse(result.body))
                } else {
                    res.status(400).send(err);
                }
            })
        }
    })
}

function getCategory(callback) {
    getCompany((res) => {
        if (res.company_id) {
            let access_token = res.access_token;
            let company_id = res.company_id;
            
            let json = querystring.stringify({
                company_id: company_id,
                parent_id: 0
            });
            let options = {
                headers: {
                    'Content-Length': json.length,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: `https://api.moloni.pt/v1/productCategories/getAll/?access_token=${access_token}`,
                body: json
            }
            request.post(options, (err, res) => {
                if (!err && res.statusCode == 200) {
                    let resBody = JSON.parse(res.body);
                    let category_id = -1;
                    for (let i = 0; i < resBody.length; i++) {
                        if (resBody[i].name == "Pedidos") {
                            category_id = resBody[i].category_id
                            console.log("CATEGORY ID: " + category_id)
                        }
                    }
                    callback({
                        'company_id': company_id,
                        'access_token': access_token,
                        'category_id': category_id
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

function getProducts(req, response) {
    getCategory((res) => {
        if (res.category_id) {
            const access_token = res.access_token;
            const company_id = res.company_id;
            const category_id = res.category_id;
            //console.log("CONFIRMAÇÃO CATEGORY ID: " + category_id);
            let json = querystring.stringify({
                company_id: company_id,
                category_id: category_id,
                qty: 0,
                offset: 0,
                with_invisible: 0
            });
            let options = {
                headers: {
                    'Content-Length': json.length,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: `https://api.moloni.pt/v1/products/getAll/?access_token=${access_token}`,
                body: json
            }
            request.post(options, (err, result) => {
                if (!err && result.statusCode == 200) {
                    response.status(200).send(JSON.parse(result.body))
                } else {
                    response.status(400).send("Erro");
                }
            })
        } else {
          response.status(400).send("Erro");
        }
    })
  }

module.exports = {
    getToken: getToken,
    getCompany: getCompany,
    getPDFLink: getPDFLink,
    inserirDadosProjetos: inserirDadosProjetos,
    getCategory: getCategory,
    getProducts: getProducts
};