//const User = require("../../Backend/Models/User");

window.onload = function () {

    const formLogin = document.getElementById("formLogin");


    formLogin.addEventListener('submit', (event) => {
        //  document.getElementById("login").disabled = true;
        event.preventDefault();

        var emailInput = document.getElementById("loginEmail").value;
        var passwordInput = document.getElementById("password-field").value;

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
            
            if (result.message == "Logged in sucessfully") {

                //if (result.message == "Logged in sucessfully") {
                Swal.fire({
                    title: 'Login efetuado com sucesso!',
                    type: 'success',
                    showCancelButton: false,
                    showConfirmButton: false,
                    showLoaderOnConfirm: false,
                    timer: 2000
                }).then(() => {
                    
                    switch (result.user.cargo) {
                        case 'cliente':
                            window.location.replace('./cliente.html')
                            break;
                        case 'arquiteto':
                            window.location.replace('./arquiteto.html')
                            break;
                        case 'camara':
                            window.location.replace('./camara.html')
                            break;
                        case 'gestor':
                            window.location.replace('./gp.html')
                            break;
                        default:
                            console.log("Falhou");
                            break;
                    }
                })
                localStorage.setItem("id", result.user.id);
            } else {
                console.log(result.message == "Password invalid");
                if (result.message == "Password invalid") {

                    Swal.fire('Password inválida')


                } else {
                    Swal.fire('Este utilizador não existe')
                }
            }
        }).catch(error => {
            console.log(error);
        });
    });
}





