
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
        const response = await fetch(url + "/logged", requestOptions);
        const pedidos = await response.json();
        console.log(pedidos);

        for (const pedido of pedidos) {
            

            //dados.push(["<div id = "" + pedido.])
            pedido.id,
            pedido.cliente,
            pedido.localizacao,
            pedido.tipo,
            pedido.descricao,
            pedido.orcamento,
            pedido.data,
            pedido.estado
        
        }

    $('#tabelaPedidos').DataTable({
        data: dados,
    });

    } catch (error) {
        console.log("Erro:" + error);
    }
}