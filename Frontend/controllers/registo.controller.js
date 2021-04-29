window.onload = function () {
    const formRegisto = document.getElementById("formRegisto");
    

    //fetch do registo

    formRegisto.addEventListener('submit', (event) => {
        document.getElementById("register").disabled = true;

        event.preventDefault();

        var firstnameInput = document.getElementById("registerFirstname").value;
        var lastnameInput = document.getElementById("registerLastname").value;
        var emailInput = document.getElementById("registerEmail").value;
        var phoneInput = document.getElementById("phone").value;
        var nifInput = document.getElementById("NIF").value;
        var passwordInput = document.getElementById("password-field").value;
        var confirmPasswordInput = document.getElementById("password-confirm").value;
        var addressdInput = document.getElementById("registerAddress").value;
        var type = 'cliente';

        console.log(nifInput);
        fetch(
            `https://api.allorigins.win/raw?url=https://www.nif.pt/?json=1&q=${nifInput}&key=03c763da3080ce65a69443db3f6fe7fb`,

            {
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(response => {
            console.log(response);
            if (response.status == 200) {
                return response.json();
            } else {
                throw new Error(
                    "Não foi possível verificar o seu NIF."
                );
            }
        }).then(result => {
            console.log(result)
            if (result.nif_validation) {
                if (passwordInput != confirmPasswordInput) {
                    throw new Error(
                        "As passwords não coincidem."
                    );
                }
                console.log("entrei");
                let data = {
                    nome: firstnameInput,
                    apelido: lastnameInput,
                    email: emailInput,
                    phone: phoneInput,
                    nif: nifInput,
                    password: passwordInput,
                    address: addressdInput,
                    type: type,
                }
                //if (firstnameInput != "" && lastnameInput != "" && emailInput != "" && phoneInput != "" && nifInput != "" && passwordInput != "" && confirmPasswordInput != "" && addressdInput != "") {
                return fetch(`https://localhost:8080/user/register`, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    mode: 'cors',
                    body: JSON.stringify(data)
                }).then(response => {
                    return response.json();
                }).then(result => {
                    if (result.message == "User inserted with success") {
                        Swal.fire({
                            title: 'Registo efetuado com sucesso!',
                            type: 'success',
                            showCancelButton: false,
                            showConfirmButton: false,
                            showLoaderOnConfirm: false,
                            timer: 2000
                        }).then(result => {
                            window.location.replace('/login.html')
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
                    document.getElementById("register").disabled = false;
                    if (error.message == 'CONTACT_EXISTS') {
                        Swal.fire({
                            title: 'Este email já existe!',
                            showCancelButton: false,
                            showConfirmButton: false,
                            type: 'error',
                            timer: 2000
                        })
                    } else if (error.message == 'NIF_EXISTS') {
                        Swal.fire({
                            title: 'Este NIF já existe!',
                            showCancelButton: false,
                            showConfirmButton: false,
                            type: 'error',
                            timer: 2000
                        })
                    } else {
                        Swal.fire({
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
            alert(error.message /*{ 
            html: '<strong><h3>O NIF que introduziu não é válido. Verifique se introduziu o seu NIF corretamente!</h3></strong>',
            type: 'error',
            showCloseButton: false,
            showConfirmButton: false,
            focusConfirm: false,
            timer: 2000
        }*/)
        })
    })
}