//window.onload = function () {
    console.log("ola nuno");
    //const formAssociar = document.getElementById("formAssociar");

    /*formAssociar.addEventListener('submit', (event) => {
        event.preventDefault();
        document.getElementById("associar").disabled = true;
*/
async function associar() {
        var pedidoInput = document.getElementById("pedido").value;
        var arquitetoInput = document.getElementById("arquiteto").value;

        console.log(pedidoInput + arquitetoInput)

        let data = {
            dealId: pedidoInput,
            arq_id: arquitetoInput,
        }
        //console.log("entrei")
        fetch(
            `http://127.0.0.1:8080/user/associarArq`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                mode: 'cors',
                method: 'PUT',
                //credentials: 'include',
                body: JSON.stringify(data)
            }).then(response => {
                return response.json();
            }).then(result => {
                console.log(result);
                if (result.message == "Architect associated with success") {
                    Swal.fire({
                        title: 'Arquiteto associado com sucesso!',
                        type: 'success',
                        showCancelButton: false,
                        showConfirmButton: false,
                        showLoaderOnConfirm: false,
                        timer: 2000
                    }).then(result => {
                        window.location.replace('./associar.html')
                    })
                } else {
                    if (result.error == "Este arquiteto não pode ser associado. Por favor, tente novamente!") {
                        throw new Error(result.error);
                    } else {
                        throw new Error(
                            "Este arquiteto não pode ser associado. Por favor, tente novamente!"
                        )
                    }
                }
            }).catch(error => {
                //document.getElementById("associar").disabled = false;
                //console.log(error)
                if (error.message == 'Este pedido e arquiteto não existem. Por favor, tente novamente!') {
                    Swal.fire({
                        html: '<strong><h3>Este pedido e arquiteto não existem. Por favor, tente novamente!</h3></strong>',
                        showCancelButton: false,
                        showConfirmButton: false,
                        type: 'error',
                        timer: 2000
                    })
                } else {
                    alert(error.message /*
                        html: '<strong><h3>Ocorreu um erro! Tente mais tarde. Obrigado!</h3></strong>',
                        showCancelButton: false,
                        showConfirmButton: false,
                        type: 'error',
                        timer: 2000
                        */
                    )
                }
            });
        }


//Fetch da página arquiteto.html
        getPedidosArquiteto();

        async function getPedidosArquiteto() {
        
            try {
                let conteudo = "";
                //falta rota
                const response = await fetch(`http://127.0.0.1:8080/`, requestOptions);
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
                    conteudo += "<td> " + "estado" + "</td></tr>";
                }
        
                document.getElementById("tbodyArquiteto").innerHTML = conteudo;
        
            } catch (error) {
                console.log("Erro:" + error);
            }
        }

