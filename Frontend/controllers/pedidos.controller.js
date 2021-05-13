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


getCountProjetos("contadorProjectos");

async function getCountProjetos(elemento) {

    try {
        let conteudo = "";
        //Fetch
        const response = await fetch(`http://127.0.0.1:8080/user/pedidos`, requestOptions);
        const pedidos = await response.json();
        console.log(pedidos);
        var contador=0;
        for (const pedido of pedidos.results) {
               contador=contador+1; 
        }

        
        //  contador=Object.keys(pedidos).length;

        document.getElementById(elemento).innerHTML = contador;

    } catch (error) {
        console.log("Erro:" + error);
    }
}



getCountPedidos("contador");

async function getCountPedidos(elemento) {

    try {
        let conteudo = "";
        //Fetch
        const response = await fetch(`http://127.0.0.1:8080/user/pedidos`, requestOptions);
        const pedidos = await response.json();
        console.log(pedidos);
        var contador=0;
        for (const pedido of pedidos.results) {
               contador=contador+1; 
        }

        document.getElementById(elemento).innerHTML = contador;

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

