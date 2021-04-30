
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
        let dados = [];

        //Fetch
        const response = await fetch(`http://127.0.0.1:8080/user/pedidos`, requestOptions);
        const pedidos = await response.json();
        console.log("Aqui: " + pedidos);
        
        console.log(JSON.stringify(pedidos.body));

        for (const pedido of pedidos.body) {
            

            //dados.push(["<div id = "" + pedido.])
            pedido.id,
            pedido.cliente,
            pedido.localizacao,
            pedido.project_type,
            pedido.description,
            pedido.amount,
            pedido.closedate,
            pedido.dealstage
        
        }

    $('#tabelaPedidos').DataTable({
        data: dados,
    });

    } catch (error) {
        console.log("Erro:" + error);
    }
}