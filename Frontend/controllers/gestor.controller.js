//const { getDefaultSettings } = require("node:http2");

//Fetch Headers
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
//Fetch requestOptions
const requestOptions = {
    mode: 'cors',
    method: 'GET',
    headers: myHeaders,
    credentials: 'include'
};

//carregar pedidos
getPedidos();

async function getPedidos() {

    try {
        let conteudo = "";
        //Fetch
        const response = await fetch(`http://127.0.0.1:8080/user/pedidos`, requestOptions);
        const pedidos = await response.json();
        console.log(pedidos);
        for (const pedido of pedidos.results) {
            conteudo += "<tr><td> " + pedido.id + "</td>";
            conteudo += "<td> " + pedido.properties.dealname + "</td>";
            conteudo += "<td> " + pedido.properties.localizacao + "</td>";
            conteudo += "<td> " + pedido.properties.project_type + "</td>";
            conteudo += "<td> " + pedido.properties.description + "</td>";
            conteudo += "<td> " + pedido.properties.amount + "</td>";
            conteudo += "<td> " + getDate(pedido.properties.closedate) + "</td>";
            conteudo += "<td> " + pedido.properties.estado_do_pedido + "</td></tr>";
        }

        document.getElementById("bodyPedidos").innerHTML = conteudo;

    } catch (error) {
        console.log("Erro:" + error);
    }
}

function getDate(date) {
    var FormattedDate = new Date(date);
    var d = FormattedDate.getDate();
    var mo = FormattedDate.getMonth()
    var a = FormattedDate.getFullYear();
    d = checkTime(d);
    mo = checkTime(mo + 1);
    return d + "-" + mo + "-" + a;
}
function checkTime(i) {
    if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
    return i;
}


