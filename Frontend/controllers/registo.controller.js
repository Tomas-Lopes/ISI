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
        

        console.log(nifInput);
        var nifvalidation = validaNIF(nifInput)
        if (nifvalidation) {
            if (passwordInput != confirmPasswordInput) {
                throw new Error(
                    "As passwords não coincidem."
                );
            }
            console.log("entrei");
            let data = {
                firstname: firstnameInput,
                lastname: lastnameInput,
                email: emailInput,
                phone: phoneInput,
                nif: nifInput,
                password: passwordInput,
                passwordConf: confirmPasswordInput,
                address: addressdInput
                
            }
            //if (firstnameInput != "" && lastnameInput != "" && emailInput != "" && phoneInput != "" && nifInput != "" && passwordInput != "" && confirmPasswordInput != "" && addressdInput != "") {
            fetch(`http://localhost:8080/user/register`, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST',
               // mode: 'cors',
                body: JSON.stringify(data)
            }).then(response => {
               return response.json();
                
            }).then(result => {
                console.log(result)
                if (result.id) {
                    Swal.fire({
                        title: 'Registo efetuado com sucesso!',
                        type: 'success',
                        showCancelButton: false,
                        showConfirmButton: false,
                        showLoaderOnConfirm: false,
                        timer: 2000
                    }).then(result => {
                        window.location.replace('./login.html')
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
                console.log(error)
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
    })
}

function validaNIF(value) {
    value = value + "";

    // has 9 digits?
    if (!/^[0-9]{9}$/.test(value)) return false;

    // is from a person?
    if (!/^[123]|45|5/.test(value)) return false;

    // digit check
    let tot =
        value[0] * 9 +
        value[1] * 8 +
        value[2] * 7 +
        value[3] * 6 +
        value[4] * 5 +
        value[5] * 4 +
        value[6] * 3 +
        value[7] * 2;
    let div = tot / 11;
    let mod = tot - parseInt(div) * 11;
    let tst = mod == 1 || mod == 0 ? 0 : 11 - mod;
    return value[8] == tst;
}

