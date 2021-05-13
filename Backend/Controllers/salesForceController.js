const request = require("request");
const bcrypt = require("bcrypt");
const hubspot = require("./hubspotController");
const con = require("../Config/ConnectionSF");


function migrarDeals(req, dealId, arquitetoId, res) {
  var options = {
    method: "GET",
    url: `https://api.hubapi.com/crm/v3/objects/deals/${dealId}`,
    qs: {
      properties:'project_type, estado_do_pedido, closedate, dealname, amount, description',
      archived: "false",
      hapikey: 'ffdfdd87-f540-403c-8427-acc9eb296971'
    },
    headers: { accept: "application/json" },
  };

  request(options, async (error, resp) => {
    if (!error) {
      let pedido = JSON.parse(resp.body);
      let data = pedido.properties;

      const id = {
        dealId: data.hs_object_id,
      };
      const propriedades = {
        Amount__c: data.amount,
        Closedate__c: data.closedate,
        Name: data.dealname,
        Dealname__c: data.hs_object_id,
        Dealstage__c: data.estado_do_pedido,
        Description__c: data.description,
        TipoProjeto__c: data.project_type,
        Arq_Id__c: arquitetoId,
        Gestor_Id__c: "1",
      };
      const migrarDeal = await con.sobject("ProjetosARQ__c").create(propriedades);
      if (!migrarDeal) return res.send("fodeu");
      return res.send(migrarDeal);
    } else {
      res({
        statusCode: res.statusCode,
        body: JSON.parse(res.body),
      });
    }
  });
}


async function alterarEstado(req, res){

    const dealID =req.body.dealId;
    const novoEstado = req.body.novoEstado;

    const ID = await con.sobject("ProjetosARQ__c").find({"SELECT ProjetosARQ__c WHERE Dealname__c EQUALS": dealID},{Id: 1});
    const updatedProj = await con.sobject("ProjetosARQ__c").update({
        id: ID,
        Dealstage__c: novoEstado
    })
    if (!updatedProj) return res.send("falhou em ataulizar o estado");
      return res.send(updatedProj);


}
module.exports = {
  migrarDeals: migrarDeals,
};
