const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

const requestOptions = {
    mode: 'cors',
    method: 'POST',
    headers: myHeaders,
    credentials: 'include'
};
//Fetch da pagina camara.html
inserirDadosProjetos();

async function inserirDadosProjetos() {

    try {
        let conteudo = "";
        const response = await fetch(`http://127.0.0.1:8080/user/pedidosCamara`, requestOptions);
        const pedidos = await response.json();
        console.log(pedidos);
        for (const pedido of pedidos) {
            conteudo += "<td> " + pedido.name + "</td>";
            conteudo += "<td> " + pedido.properties[3].value + "</td>";
            conteudo += "<td> " + pedido.properties[1].value + "</td>";
            conteudo += "<td> " + pedido.summary + "</td>";
            conteudo += "<td> " + pedido.price + "</td>";
            conteudo += "<td> " + getDate(pedido.properties.CloseDate) + "</td>";
            conteudo += "<td> " + pedido.properties[6].value + "</td>";
        }

        document.getElementById("bodyCamara").innerHTML = conteudo;

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


//Fetch enviar doc camara
/*window.onload = function () {
    const formNovoPedido = document.getElementById("formNovoPedido");


    formNovoPedido.addEventListener('submit', (event) => {
        event.preventDefault();
        document.getElementById("register").disabled = true;

        console.log("tou");
        //localizacao com api
        var localizacaoInput = document.getSelection("registerLocation").value;
        var descricaoInput = document.getElementById("registerDescription").value;
        var tipoInput = document.getElementById("registerType").value;

        let data = {
            location: localizacaoInput,
            description: descricaoInput,
            type: tipoInput,
        }

        fetch(`http://127.0.0.1:8080/user/`, {
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data)
        }).then(response => {
            console.log(response);
            if (response.status == 200) {
                Swal.fire({
                    title: 'Documento enviado com sucesso!',
                    type: 'success',
                    showCancelButton: false,
                    showConfirmButton: false,
                    showLoaderOnConfirm: false,
                    timer: 2000
                }).then(response => {

                    window.location.replace('./camara.html')
                })
            } else {
                if (response.error == "Tenta outra vez") {
                    throw new Error(response.error);
                } else {
                    throw new Error(
                        "Tenta outra vez"
                    )
                }
            }
            return response.json();
        }).catch(error => {
            console.log(error);
        })
    })
}
*/

//fetch aprovar pedido
function aprovarPedido() {
            //preciso alterar isto
        var idInput = document.getElementById("registerFirstname").value;
        //var estadoInput = document.getElementById("registerLastname").value;

        let data = {
            //corrigir
            dealid: idInput,
            state: "Aprovado"
        }

        fetch(`http://localhost:8080/user/alterarEst`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'PUT',
            // mode: 'cors',
            body: JSON.stringify(data)
        }).then(response => {
            return response.json();

        }).then(result => {
            console.log(result);
            if (result.id) {
                Swal.fire({
                    title: 'Aprovado com sucesso!',
                    type: 'success',
                    showCancelButton: false,
                    showConfirmButton: false,
                    showLoaderOnConfirm: false,
                    timer: 2000
                }).then(result => {
                    window.location.replace('/camara.html')
                })
            } else {
                throw new Error(
                    "Ocorreu um erro! Tente novamente. Obrigado!"
                );
            }
        })
}


//fetch rejeitar pedido
function rejeitarPedido() {
    //preciso alterar isto
var idInput = document.getElementById("registerFirstname").value;
//var estadoInput = document.getElementById("registerLastname").value;

let data = {
    //corrigir
    dealid: idInput,
    state: "Rejeitado"
}

fetch(`http://localhost:8080/user/alterarEst`, {
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'PUT',
    // mode: 'cors',
    body: JSON.stringify(data)
}).then(response => {
    return response.json();

}).then(result => {
    console.log(result);
    if (result.id) {
        Swal.fire({
            title: 'Rejeitado com sucesso!',
            type: 'success',
            showCancelButton: false,
            showConfirmButton: false,
            showLoaderOnConfirm: false,
            timer: 2000
        }).then(result => {
            window.location.replace('/camara.html')
        })
    } else {
        throw new Error(
            "Ocorreu um erro! Tente novamente. Obrigado!"
        );
    }
})
}

/*
id="approved"
id="rejected"
id="dealsCamara"
*/