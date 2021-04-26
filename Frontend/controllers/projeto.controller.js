//API KEY OPEN WEATHER: a42ff2ea45817efeb7a50371dab2d51e
const formNovoProjeto = document.getElementById("formNovoProjeto");

function login() {

    formNovoProjeto.addEventListener('entrar', (event) => {
        document.getElementById("login").disabled = true;
        event.preventDefault();
    
        //localizacao com api
        var tipoInput = document.getSelection("tipoProjeto").value;
        var descricaoInput = document.getElementById("loginEmail").value;
        var orcamentoInput = document.getElementById("loginPassword").value;
        var dataInput = doucment.getElementById("askjdna").value;
    
        let data = {
            tipo: tipoInput,
            descricao: descricaoInput,
            orcamento: orcamentoInput,
            data: dataInput
        }

        return fetch(`localhost:3000/user/login`, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => {
            return response.json();
        }).then(result => {
            if (result.message == "Projeto criado com sucesso") {
                swal({
                    title: 'Pedido de projeto efetuado com sucesso!',
                    type: 'success',
                    showCancelButton: false,
                    showConfirmButton: false,
                    showLoaderOnConfirm: false,
                    timer: 2000
                }).then(result => {
                    window.location.replace('/')
                })
            } else {
                //ARRANJAR ESTA PARTE
                
                if (result.error == "CONTACT_EXISTS") {
                    throw new Error(result.error);
                } else {
                    throw new Error(
                        "Este e-mail não existe. Por favor, efetue o registo!"
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