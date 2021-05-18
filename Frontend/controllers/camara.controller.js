//Fetch da pagina camara.html
getPedidosCamara();

async function getPedidosCamara() {

    try {
        let conteudo = "";
        //falta rota
        const response = await fetch(`http://127.0.0.1:8080/user/pedidosCamara`, requestOptions);
        const pedidos = await response.json();
        console.log(pedidos);
        for (const pedido of pedidos.results) {
            conteudo += "<tr><td> " + pedido.id + "</td>";
            conteudo += "<td> " + pedido.properties.dealname + "</td>";
            conteudo += "<td> " + "pedido.localizacao" + "</td>";
            conteudo += "<td> " + pedido.project_type + "</td>";
            conteudo += "<td> " + "descricao" + "</td>";
            conteudo += "<td> " + pedido.properties.amount + "</td>";
            conteudo += "<td> " + getDate(pedido.properties.closedate) + "</td>";

        }

        document.getElementById("tbodyCamara").innerHTML = conteudo;

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
window.onload = function () {
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
    
                    //document.getElementById('pedidocriado').click();
                    /*setTimeout(function () {
                        window.location.replace('./cliente.html');
                    }, 2000);*/
                } else {
                    if (response.error == "Tenta outra vez") {
                        throw new Error(response.error);
                    } else {
                        throw new Error(
                            "Tenta outra vez"
                        )
                    //document.getElementById('pedidonaocriado').click();
                    /*setTimeout(function () {
                        location.reload();
                    }, 2000);*/
                }
            }
                return response.json();
            }).catch(error => {
                console.log(error);
            })
        })
    }


//aprovar 