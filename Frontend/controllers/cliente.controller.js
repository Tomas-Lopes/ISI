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
getClients();

async function getClients() {

    try {
        let conteudo = "";
        //Fetch
        const response = await fetch('http://127.0.0.1:8080/user/clients', requestOptions);
        const clientes = await response.json();
        console.log("aqui:");
        console.log(clientes);
        for (const clientes of clientes.results) {
            conteudo += "<tr><td> " + clientes.vid + "</td>";
            conteudo += "<td> " + clientes.properties.firstname + "</td>";
            conteudo += "<td> " + clientes.properties.email + "</td>";
            conteudo += "<td> " + clientes.properties.nif + "</td>";
            conteudo += "<td> " + clientes.properties.phone + "</td>";
        }

        document.getElementById("bodyClientes").innerHTML = conteudo;

    } catch (error) {
        console.log("Erro:" + error);
    }
}
