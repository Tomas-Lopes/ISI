window.onload = function () {
const formNovoPedido = document.getElementById("formNovoPedido");

    
    formNovoPedido.addEventListener('submit', (event) => {
        event.preventDefault();
        document.getElementById("register").disabled = true;
        
        console.log("tou");
        //localizacao com api
        var tipoInput = document.getSelection("tipoProjeto").value;
        var descricaoInput = document.getElementById("description").value;
        var orcamentoInput = document.getElementById("orcamento").value;
        var dataInput = document.getElementById("data").value;

        let data = {
            tipo: tipoInput,
            descricao: descricaoInput,
            orcamento: orcamentoInput,
            data: dataInput
        }

        fetch(`http://localhost:8080/user/newProject`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify(data)
        }).then(response => {
            console.log(response);
            if (response.status == 200) {
                Swal.fire({
                    title: 'Pedido inserido com sucesso!',
                    type: 'success',
                    showCancelButton: false,
                    showConfirmButton: false,
                    showLoaderOnConfirm: false,
                    timer: 2000
                }).then(response => {
                    
                    window.location.replace('./cliente.html')
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
            return response.json();
        }).catch(error => {
            console.log(error);
        })
    })
}



