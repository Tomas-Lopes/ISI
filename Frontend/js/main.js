const formRegisto = document.getElementById("formRegisto");
const formLogin = document.getElementById("formLogin");

formRegisto.addEventListener('submit', (event) => {
    document.getElementById("register").disabled = true;

    var nameInput = document.getElementById("registerName").value;
    var emailInput = document.getElementById("registerEmail").value;
    var phoneInput = document.getElementById("registerTelefone").value;
    var nifInput = document.getElementById("registerNif").value;
    var passwordInput = document.getElementById("registerPassword").value;
    var confirmPasswordInput = document.getElementById("registerRepeatPassword").value;

    event.preventDefault();
    return fetch(
        `https://cors-anywhere.herokuapp.com/https://www.nif.pt/?json=1&q=${document.getElementById("registerNif").value}&key=517d02fba0547e1bd8d68dbcc36e6ea4`
    ).then(response => {
        if (response.status == 200) {
            return response.json();
        } else {
            throw new Error(
                "Não foi possível verificar o seu NIF."
            );
        }
    }).then(result => {
        if (result.nif_validation) {

            if(passwordInput != confirmPasswordInput){
                throw new Error(
                    "As passwords não coincidem."
                );
            }

            let data = {
                nome: nameInput,
                email: emailInput,
                phone: phoneInput,
                nif: nifInput,
                password: passwordInput,
            }
            return fetch(`localhost:3000/user/register`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
                body: JSON.stringify(data)
            }).then(response => {
                return response.json();
            }).then(result => {
                if (result.message == "User inserted with success") {
                    swal({
                        title: 'Registo efetuado com sucesso!',
                        type: 'success',
                        showCancelButton: false,
                        showConfirmButton: false,
                        showLoaderOnConfirm: false,
                        timer: 2000
                    }).then(result => {
                        window.location.replace('/')
                    })
                } else {
                    if (result.error == "CONTACT_EXISTS") {
                        throw new Error(result.error);
                    } else if (result.error == "NIF_EXISTS") {
                        throw new Error(result.error);
                    } else {
                        throw new Error(
                            "Ocorreu um erro! Tente novamente. Obrigado!"
                        );
                    }
                }
            }).catch(error => {
                document.getElementById("registar").disabled = false;
                if (error.message == 'CONTACT_EXISTS') {
                    swal({
                        title: 'Este email já existe!',
                        showCancelButton: false,
                        showConfirmButton: false,
                        type: 'error',
                        timer: 2000
                    })
                } else if (error.message == 'NIF_EXISTS') {
                    swal({
                        title: 'Este NIF já existe!',
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
        } else {
            throw new Error(
                "O NIF que introduziu não é válido. Verifique se introduziu o seu NIF corretamente!"
            );
        }
    }).catch(error => {
        swal({
            html: '<strong><h3>O NIF que introduziu não é válido. Verifique se introduziu o seu NIF corretamente!</h3></strong>',
            type: 'error',
            showCloseButton: false,
            showConfirmButton: false,
            focusConfirm: false,
            timer: 2000
        })
    })
})

formLogin.addEventListener('entrar', (event) => {
    document.getElementById("login").disabled = true;
    event.preventDefault();

    
    var emailInput = document.getElementById("loginEmail").value;
    var passwordInput = document.getElementById("loginPassword").value;
    
})