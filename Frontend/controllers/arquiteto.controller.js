window.onload = function () {
    console.log("ola nuno");
    const formAssociar = document.getElementById("formAssociar");
    

    //fetch do registo

    formAssociar.addEventListener('submit', (event) => {
        document.getElementById("associar").disabled = true;

        event.preventDefault();

        var pedidoInput = document.getElementById("tipoPedido").value;
        var arquitetoInput = document.getElementById("tipoArquiteto").value;

        let data = {
            pedido: pedidoInput,
            arquiteto: arquitetoInput,
        }

        fetch(
            //nao ha rota ainda
            `http://127.0.0.1:8080/user/associarArq`,
            {
                mode: 'cors',
                method: 'POST',
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
                document.getElementById("associar").disabled = false;
                if (error.message == 'Este pedido e arquiteto não existem. Por favor, tente novamente!') {
                    swal({
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
        });
    }