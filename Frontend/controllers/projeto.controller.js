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
        var nomeInput = document.getElementById("nome_pedido").value;
        var localizacao = document.getElementById("address").value;
        var latitude = marker.getPosition().lat().toString();
        var longitude = marker.getPosition().lng().toString();

        moment(dataInput).utc().startOf('day').unix() * 1000;

        let data = {
            dealname: nomeInput,
            project_type: tipoInput,
            description: descricaoInput,
            amount: orcamentoInput,
            closedate: dataInput,
            dealstage: "appointmentscheduled",
            arq_id: "0",
            gestorid: "1",
            latitude: latitude,
            longitude: longitude,
            localizacao: localizacao
        }

        fetch(`http://127.0.0.1:8080/user/newProject`, {
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
                    title: 'Pedido inserido com sucesso!',
                    type: 'success',
                    showCancelButton: false,
                    showConfirmButton: false,
                    showLoaderOnConfirm: false,
                    timer: 2000
                }).then(response => {

                    window.location.replace('./cliente.html')
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



