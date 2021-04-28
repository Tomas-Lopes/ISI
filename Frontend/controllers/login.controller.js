window.onload = function () {

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

       fetch(`http://127.0.0.1:8080/user/login`, {
           
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: "include",
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify(data)
        }).then(response => {
            return response.json();
        }).then(result => {
            console.log(result);
            if (result.message == "Logged in sucessfully") {
                Swal.fire({
                    title: 'Login efetuado com sucesso!',
                    type: 'success',
                    showCancelButton: false,
                    showConfirmButton: false,
                    showLoaderOnConfirm: false,
                    timer: 2000
                }).then(result => {
                    window.location.replace('./cliente.html')
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
            if (error.message == 'Este e-mail e password não existem. Por favor, tente novamente!') {
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


