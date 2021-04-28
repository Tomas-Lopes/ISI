const formNovoPedido = document.getElementById("formNovoPedido");

function submeterPedido() {

    formNovoProjeto.addEventListener('submit', (event) => {
        document.getElementById("register").disabled = true;
        event.preventDefault();

        //localizacao com api
        var tipoInput = document.getSelection("tipoProjeto").value;
        var descricaoInput = document.getElementById("description").value;
        var orcamentoInput = document.getElementById("orcamento").value;
        var dataInput = doucment.getElementById("data").value;

        let data = {
            tipo: tipoInput,
            descricao: descricaoInput,
            orcamento: orcamentoInput,
            data: dataInput
        }

        return fetch(`http://localhost:8080/user/newProject`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => {
            console.log(response)
            if (response.status == 200) {
                document.getElementById('pedidocriado').click();
                setTimeout(function () {
                    window.location.replace('./cliente.html');
                }, 2000);
            } else {
                document.getElementById('pedidonaocriado').click();
                setTimeout(function () {
                    location.reload();
                }, 2000);
            }
            return result.json();
        }).then(data => {
            console.log(data);
        })
    })
}
/*
 if (result.message == "Projeto criado com sucesso") {
                swal({
                    title: 'Pedido de projeto efetuado com sucesso!',
                    type: 'success',
                    showCancelButton: false,
                    showConfirmButton: false,
                    showLoaderOnConfirm: false,
                    timer: 2000
                }).then(result => {
                    window.location.replace('/cliente.html')
                })
            } else {

                if (result.error == "PROJECT_EXISTS") {
                    throw new Error(result.error);
                } else {
                    throw new Error(
                        "Este Projeto já existe, tente novamente!"
                    )
                }
            }
        }).catch(error => {
            document.getElementById("login").disabled = false;
            if (error.message == 'CONTACT_EXISTS') {
                swal({
                    title: 'Este email já existe!',
                    showCancelButton: false,
                    showConfirmButton: false,
                    type: 'error',
                    timer: 2000
                })
            } else {
                swal({
                    html: '<strong><h3>Ocorreu um erro! Tente novamente mais tarde. Obrigado!</h3></strong>',
                    showCancelButton: false,
                    showConfirmButton: false,
                    type: 'error',
                    timer: 2000
                })
            }
        });
    });
}
*/
