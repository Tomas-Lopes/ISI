const request = require("request");
const bcrypt = require("bcrypt");
const hubspot = require("./hubspotController");

function projectSalesForce(req, res) {
    const amount = req.body.amount;
    const closedate = req.body.closedate;
    const dealname = req.body.dealname;
    const dealstage = req.body.dealstage;
    const description = req.body.description;
    const project_type = req.body.project_type;
  
    const properties = {
        Amount__c: amount,
        Closedate__c: closedate,
        Dealname__c: dealname,
        Dealstage__c: dealstage,
        Description__c: description,
        TipoProjeto__c: project_type,
      hubspot_owner_id: "69176641",
      pipeline: "default",
      Arq_Id__c: "0",
      Gestor_Id__c: "1",
    };
}
    
  