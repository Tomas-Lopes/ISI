window.onload = function () {
    console.log("ola nuno");

    const formLogin = document.getElementById("formLogin");


    formLogin.addEventListener('submit', (event) => {
        document.getElementById("login").disabled = true;
        event.preventDefault();

        var emailInput = document.getElementById("loginEmail").value;
        var passwordInput = document.getElementById("loginPassword").value;

        let data = {
            email: emailInput,
            password: passwordInput,
        }

       fetch(`http://localhost:3000/user/login`, {
            mode: 'no-cors',
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
                    title: 'Login efetuado com sucesso!',
                    type: 'success',
                    showCancelButton: false,
                    showConfirmButton: false,
                    showLoaderOnConfirm: false,
                    timer: 2000
                }).then(result => {
                    window.location.replace('/')
                })
            } else {
                if (result.error == "Estes e-mail e password não existem. Por favor, tente novamente!") {
                    throw new Error(result.error);
                } else {
                    throw new Error(
                        "Estes e-mail e password não existem. Por favor, tente novamente!"
                    )
                }
            }
        }).catch(error => {
            document.getElementById("login").disabled = false;
            if (error.message == 'Estes e-mail e password não existem. Por favor, tente novamente!') {
                swal({
                    html: '<strong><h3>Estes e-mail e password não existem. Por favor, tente novamente!</h3></strong>',
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


