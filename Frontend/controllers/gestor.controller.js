
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
            const id = eachPedidos(pedido.id);
            const cliente = eachPedidos(pedido.cliente);
            const localizacao = eachPedidos(pedido.localizacao);
            const tipo = eachPedidos(pedido.tipo);
            const descricao = eachPedidos(pedido.descricao);
            const orcamento = eachPedidos(pedido.orcamento);
            const data = eachPedidos(pedido.data);
            const estado = eachPedidos(pedido.estado);

            //dados.push(["<div id = "" + pedido.])


        }

    $('#tabelaPedidos').DataTable({
        data: dados,
    });

    } catch (error) {
        console.log("Erro:" + error);
    }
}