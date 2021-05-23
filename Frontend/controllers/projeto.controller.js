window.onload = function () {
    const formNovoPedido = document.getElementById("formNovoPedido");


    formNovoPedido.addEventListener('submit', (event) => {
        event.preventDefault();
        document.getElementById("register").disabled = true;

        var tipoInput = document.getElementById("tipoPedido");
        var selectedText = tipoInput.options[tipoInput.selectedIndex].text;

        var descricaoInput = document.getElementById("description").value;
        var orcamentoInput = document.getElementById("orcamento").value;
        var dataInput = new Date(document.getElementById("data").value).getTime();
        var nomeInput = document.getElementById("nome_pedido").value;
        var localizacao = document.getElementById("address").text;
        var latitude = marker.getPosition().lat().toString();
        var longitude = marker.getPosition().lng().toString();
        var id = localStorage.getItem("id");

        console.log(localizacao);

        let data = {
            id: id,
            dealname: nomeInput,
            project_type: selectedText,
            description: descricaoInput,
            amount: orcamentoInput,
            closedate: dataInput,
            dealstage: "appointmentscheduled",
            arq_id: "0",
            gestorid: "1",
            latitude: latitude,
            longitude: longitude,
            localizacao: localizacao,
            estado_do_pedido: "Pendente"
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



