const request = require("request");
const bcrypt = require("bcrypt");
const hubspot = require("./hubspotController");
const con = require("../Config/ConnectionSF");

function migrarDeals(req, dealId, arquitetoId, res) {
  var options = {
    method: "GET",
    url: `https://api.hubapi.com/crm/v3/objects/deals/${dealId}`,
    qs: {
      properties:
        "project_type, estado_do_pedido, closedate, dealname, amount, description, latitude, longitude",
      archived: "false",
      hapikey: "ffdfdd87-f540-403c-8427-acc9eb296971",
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
        Latitude__c: data.latitude,
        Longitude__c: data.longitude,
        Localizacao__c: data.localizacao,
        Arq_Id__c: arquitetoId,
        Gestor_Id__c: "1",
        Enviado__c: "0"
      };
      const migrarDeal = await con
        .sobject("ProjetosARQ__c")
        .create(propriedades);
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

async function alterarEstado(dealId, novoEstado, res) {
  //const dealID = req.body.dealId;
  //const novoEstado = req.body.novoEstado;

  const ID = await con.sobject("ProjetosARQ__c").findOne(
    {
      Dealname__c: dealId,
    },
    { Id: 1 }
  );
  
  const updatedProj = await con.sobject("ProjetosARQ__c").update({
    Id: ID.Id,
    Dealstage__c: novoEstado,
  });
  if (!updatedProj) return res.send("falhou em atualizar o estado");
  return res.send(updatedProj);
}
module.exports = {
  migrarDeals: migrarDeals,
  alterarEstado: alterarEstado,
};
