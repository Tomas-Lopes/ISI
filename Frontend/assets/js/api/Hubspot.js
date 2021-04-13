
var fileTag = document.getElementById("filetag"),
    preview = document.getElementById("preview");
let user;
var articles;

//Registar Utilizador
function registarUtilizador() {
    var name = document.getElementById("registerName").value;
    var email = document.getElementById("registerEmail").value;
    var phone = document.getElementById("registerTelefone").value;
    var city = document.getElementById("registerCidade").value;
    var country = document.getElementById("registerPais").value;
    var sector = "";
    var responsible = document.getElementById("registerResponsible").value;
    var nif = document.getElementById("registerNif").value;
    var type = 'empresa';
    var password = document.getElementById("registerPassword").value;
    var confirmPassword = document.getElementById("registerRepeatPassword").value;
    if (name != "" && email != "" && phone != "" && city != "" && country != "" && responsible != "" && password != "" && confirmPassword != "") {
        if (CheckPasswordStrength(password) == true) {
            if (confirmPassword == password) {
                //MUDAR ESTE SITE!!
                fetch("https://environ-back.herokuapp.com/register", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        phone: phone,
                        city: city,
                        country: country,
                        sector: sector,
                        responsible: responsible,
                        nif: nif,
                        type: type,
                        password: password
                    })
                }).then((response) => {
                    return response.json();
                }).then((data) => {
                    return data
                }).then(() => {
                    document.getElementById('registerDiv').innerHTML =
                        `<div class="row justify-content-center">
                        <div class="col-lg-6 col-md-8">
                            <div class="card bg-secondary border-0">
                                <div class="card-body px-lg-5 py-lg-5">
                                    <div class="text-center text-muted mb-4">
                                        <h4>Confirmação por email</h4>
                                    </div>
                                    <div class="text-center text-muted mb-4">
                                        <small>Verifique o seu email para posterior ativação da conta</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
                    document.getElementById("SUCCESS").click();
                }).catch(error => {
                    document.getElementById("ERROR").click();
                })
            } else {
                document.getElementById("NOTWORKING").click();
            }
        } else {
            document.getElementById("WORKING").click();
        }
    } else {
        document.getElementById("EMPTYFIELDS").click();
    }
}

//Login Utilizador
async function login() {

    document.getElementById('loginButton').innerHTML = `<div class="loader" style="margin-top: 3.0rem; margin-left: auto; margin-right: auto"></div>`

    var email = document.getElementById("loginEmail").value;
    var password = document.getElementById("loginPassword").value;
    //MUDAR ESTE SITE!!
    await fetch("https://environ-back.herokuapp.com/login", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            email: email,
            password: password
        })
    }).then((response) => {
        var myStatus = response.status;
        if (myStatus == 400) {
            document.getElementById("VERIFIQUEEMAIL").click();
            throw new Error("verificar email");
        }
        if (myStatus != 200 && myStatus != 400) {
            document.getElementById("FALSELOGIN").click();
            throw new Error("credenciais");
        }
        return response.json()
    })
        .then(() => {
            debug();
        }).catch(error => {
            document.getElementById('loginButton').innerHTML = `<button onclick="login()" type="button" class="btn btn-primary my-4">
            Entrar
          </button>`
            return error;
        })
}
/*
//Recuperar Password Utilizador
function recoverPassword() {
    var email = document.getElementById("recoverEmail").value;
    //MUDAR ESTE SITE!!
    fetch("https://environ-back.herokuapp.com/user/recoverPassword", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            email: email,
        })
    }).then((response) => {
        if (response.ok) {
            sessionStorage.clear;
            document.getElementById("recoverEmail").value = "";
            document.getElementById("SUCCESS").click();
            setTimeout(function () {
                window.location.assign('/pages/all/login.html')
            }, 2000);
        }
        return response.clone().json();
    }).then(result => {
        console.log(result.msg);
    }).catch(error => {
        console.log(error)
    })
}
*/
//Mandar verificação por email
async function requestVerification() {
    var email = document.getElementById('requestedEmail').value;
    //MUDAR ESTE URL
    await fetch("https://environ-back.herokuapp.com/requestEmailVerification", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({
            email: email,
        })
    }).then((response) => {
        if (response.ok) {
            window.location.assign('/pages/all/login.html');
        }
    })
}

//Logout Utilizador
async function logout() {
    //MUDAR ESTE SITE
    await fetch('https://environ-back.herokuapp.com/logout', {
        method: 'GET',
        credentials: 'include'
    }).then(response => {
        if (response.ok) {
            window.location.assign("../../../index.html")
            localStorage.removeItem('notiToken');
            sessionStorage.removeItem('user');
        }
    })
}

//Get photo URL with Storage Firebase
function edit(input) {
    var reader;
    if (input.files && input.files[0]) {
        reader = new FileReader();
        reader.onload = function (e) {
            preview.setAttribute('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
        var storage = firebase.storage();
        var storageRef = storage.ref();
        // File or Blob named mountains.jpg
        var file = input.files[0];
        // Create the file metadata
        var metadata = {
            contentType: 'image/jpeg'
        };
        // Upload file and metadata to the object 'images/mountains.jpg'
        var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);
        // Listen for state changes, errors, and completion of the upload.
        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, function (snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
                case 'storage/unauthorized':
                    // User doesn't have permission to access the object
                    break;
                case 'storage/canceled':
                    // User canceled the upload
                    break;
                case 'storage/unknown':
                    // Unknown error occurred, inspect error.serverResponse
                    break;
            }
        }, function () {
            // Upload completed successfully, now we can get the download URL
            uploadTask.snapshot.ref.getDownloadURL().then(async function (downloadURL) {
                console.log(downloadURL)
                document.getElementById("input-photo-url").value = downloadURL;
            });
        });
    }
}
/*
//Função para abrir SweetAlert para atualizar dados
function updateUserInfo() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Tem a certeza?',
        text: "Está prestes a atualizar a sua informação!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, atualizar dados!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            atualizarConta();
            swalWithBootstrapButtons.fire(
                'Dados atualizados!',
                'Os seus dados foram atualizados com sucesso.',
                'success'
            )
        } else if (
            // Read more about handling dismissals below 
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelada',
                'Ação cancelada com sucesso',
                'error'
            )
        }
    })
}
*/
// Editar dados do utilizador
async function atualizarConta() {
    var name = document.getElementById("input-name").value;
    var phone = document.getElementById("input-phone").value;
    var city = document.getElementById("input-cidade").value;
    var country = document.getElementById("input-pais").value;
    var nif = document.getElementById("input-nif").value;
    var photo;
    if (document.getElementById("input-photo-url").value == "") {
        photo = document.getElementById("preview").src;
    } else {
        photo = document.getElementById("input-photo-url").value
    }
    //MUDAR ESTE SITE
    await fetch('https://environ-back.herokuapp.com/user/edit', {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            phone: phone,
            city: city,
            country: country,
            nif: nif,
            photo_url: photo
        })
    }).then(response => {
        return response.clone().json();
    }).then(result => {
        //MUDAR ESTE URL
        fetch('https://environ-back.herokuapp.com/user', {
            credentials: 'include'
        }).then(resp => {
            return resp.json();
        }).then(result => {
            sessionStorage.removeItem("user");
            var user = JSON.stringify(result.user);
            sessionStorage.setItem("user", user);
            console.log(user);
            window.location.reload();
        })
    }).catch(error => {
        console.log(error)
    })
}

//getUserInfo
function debug() {
    fetch('https://environ-back.herokuapp.com/user', {
        method: 'GET',
        credentials: 'include'
    }).then(response => {
        return response.json();
    }).then(result => {
        var user = JSON.stringify(result.user);
        sessionStorage.setItem("user", user);

        messaging.requestPermission().then(function () {
            console.log('Have permission');
            return messaging.getToken();
        }).then(function (token) {
            console.log(token)
            fetch('https://environ-back.herokuapp.com/notification/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({ notiToken: token })
            }).then(() => {
                localStorage.setItem('notiToken', token);
                window.location.replace("../../../pages/" + result.user.role + "/dashboard.html");
            })

        }).catch(error => {
            console.log(error);
        })

    }).catch(error => {
        console.log(error)
        window.location.assign("../../pages/all/login.html");
    })
}
if (fileTag != null) {
    fileTag.addEventListener("change", function () {
        edit(this);
    });
}

// Colocar info do user no profile
function setUserInfo() {

    //Session Storage
    var user = JSON.parse(sessionStorage.getItem("user"));

    /*sessionStorage.setItem('role', result.user.role);
    sessionStorage.setItem('name', result.user.name);
    sessionStorage.setItem('email', result.user.email);
    sessionStorage.setItem('photo', result.user.photoUrl);
    sessionStorage.setItem('uid', result.user.uid);*/

    //Profile
    document.getElementById("hello").innerHTML += user.name;
    document.getElementById("hello6").innerHTML = user.name;
    document.getElementById("nameInfo").innerHTML = user.name;
    document.getElementById("input-name").value = user.name;
    document.getElementById("input-email").value = user.email;
    document.getElementById("output-email").innerHTML = user.email;
    document.getElementById("input-phone").value = user.phoneNumber;
    document.getElementById("input-cidade").value = user.city;
    document.getElementById("input-pais").value = user.country;
    document.getElementById("input-nif").value = user.nif;
    document.getElementById("preview").src = user.photoURL;
    document.getElementById("output-city-country").innerHTML = user.city + ", " + user.country;
    document.getElementById("preview").src = user.photoUrl;
    document.getElementById("img1").src = user.photoUrl;
    if (user.role === 'admin') {
        document.getElementById("output-sector").innerHTML = "Administrador"
    }
    if (user.role === 'empresa') {
        document.getElementById("output-sector").innerHTML = "Organização"
    }
    if (user.role === 'camara') {
        document.getElementById("output-sector").innerHTML = "Câmara Municipal"
    }
}

//Apgar utilizador
function deleteUser() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Tem a certeza?',
        text: "Poderá reverter esta ação falando com um dos administradores.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, desativar conta!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            fetch('https://environ-back.herokuapp.com/user/delete/me', {
                method: 'DELETE',
                credentials: 'include'
            }).then(response => {
                window.location.assign("../../pages/all/login.html");
                return response.json();
            }).then(result => {
                console.log(result);
            }).catch(error => {
                console.log(error)
            })
            swalWithBootstrapButtons.fire(
                'Conta desativada!',
                'A sua conta foi desativada com sucesso.',
                'success'
            )
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelada',
                'Ação cancelada com sucesso',
                'error'
            )
        }
    })
}

//Antes de alterar email verificar se password e confirmação de password são idênticas
function verificationPassword() {
    var password = document.getElementById("passwordAlt").value;
    var passwordConfirmation = document.getElementById("passwordConfirmAlt").value;
    if (password == passwordConfirmation) {
        if (CheckPasswordStrength(password) == true) {
            alterarPassword(password)
        } else {
            document.getElementById("naorequisitos").click();
        }
    } else {
        document.getElementById("incorrespondecia").click();
    }
}
// Alterar email do utilizador
function alterarPassword(password) {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Tem a certeza?',
        text: "A sua password será alterada!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, alterar password!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            fetch('https://environ-back.herokuapp.com/user/changePassword', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    password: password,
                })
            }).then(response => {
                return response.clone().json();
            }).then(result => {
                console.log(result.msg);
            }).catch(error => {
                console.log(error)
            })
            swalWithBootstrapButtons.fire(
                'Password alterada!',
                'A sua password foi alterada com sucesso!',
                'success'
            ).then(function () {
                location.reload();
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelada',
                'Ação cancelada com sucesso',
                'error'
            )
        }
    })
}

// Alterar email do utilizador
function alterarEmail() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Tem a certeza?',
        text: "Poderá reverter esta ação no seu mail antigo!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, alterar email!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            var email = document.getElementById("altMail").value;
            fetch('https://environ-back.herokuapp.com/user/changeEmail', {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    email: email,
                })
            }).then(response => {
                console.log(response.json())
                return response.json();
            }).then(result => {
                console.log(result);
            }).catch(error => {
                console.log(error)
            })
            swalWithBootstrapButtons.fire(
                'Email alterado!',
                'Poderá reverter esta ação no email antigo. Precisará ainda de ativar novamente esta conta no novo email',
                'success'
            ).then(function () {
                window.location.assign("../../pages/all/profile.html");
            });
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelada',
                'Ação cancelada com sucesso',
                'error'
            )
        }
    })
}

// function render() {
//     var number = document.getElementById("altPhone").value;
//     var applicationVerifier = new firebase.auth.RecaptchaVerifier(
//     'recaptcha-container');
//     var provider = new firebase.auth.PhoneAuthProvider();
//     provider.verifyPhoneNumber(number, applicationVerifier)
//         .then(function(verificationId) {
//           var verificationCode = document.getElementById("verificationCode");
//           return firebase.auth.PhoneAuthProvider.credential(verificationId,
//               verificationCode);
//         })
//         .then(function(phoneCredential) {
//             alterarPhone(phoneCredential)
//           });
// }


// Alterar TELEMOVEL do utilizador
async function alterarPhone() {
    var phone = document.getElementById("altPhone").value;
    var applicationVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
    var provider = new firebase.auth.PhoneAuthProvider();
    provider.verifyPhoneNumber(phone, applicationVerifier)
        .then(async function (verificationId) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false
            })
            const {
                value: verificationCode
            } = await Swal.fire({
                title: 'Verificação de código',
                text: "Digite o código que lhe foi enviado para o telemóvel: " + phone,
                icon: 'warning',
                input: 'text',
                inputPlaceholder: '######',
                customClass: {
                    input: 'text-center',
                },
                showCancelButton: true,
                inputValidator: (value) => {
                    if (!value) {
                        return 'Tens de colocar um código'
                    }
                }
            })
            if (verificationCode) {
                var vc = verificationCode.toString();
                var vi = verificationId.toString();
                console.log(vc + "<vc  vi> " + vi)
                await fetch('https://environ-back.herokuapp.com/user/changePhone', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        verificationCode: vc,
                        verificationId: vi
                    })
                }).then(response => {
                    return response.clone().json();
                }).then(result => {
                    console.log(result.msg)
                    swalWithBootstrapButtons.fire(
                        'Contacto telefónico alterado!',
                        'O seu contacto telefónico foi alterado com sucesso.',
                        'success'
                    ).then(function () {
                        location.reload();
                    });
                }).catch(error => {
                    console.log(error.error)
                })
            }
        })
}

// Block or unblock user info configuration
var count = 2;

function blockUnblock() {
    count += 1;
    console.log(count)
    if (isOdd(count) == true) {
        document.getElementById("blockUnblock").innerHTML = "Bloquear configurações";
        document.getElementById("blockUnblock").className = "text-white btn btn-sm btn-danger"
        document.getElementById("input-name").disabled = false
        // document.getElementById("input-email").disabled = false
        document.getElementById("input-nif").disabled = false
        // document.getElementById("input-phone").disabled = false
        document.getElementById("input-cidade").disabled = false
        document.getElementById("input-pais").disabled = false
        document.getElementById("filetag").disabled = false
        document.getElementById("atualizarConta").disabled = false
        document.getElementById("apagarConta").disabled = false
        document.getElementById("popUpEmail").classList.remove("disabled");
        document.getElementById("popUpTel").classList.remove("disabled");
        document.getElementById("popUpPass").classList.remove("disabled");
    } else {
        document.getElementById("blockUnblock").innerHTML = "Desbloquear configurações";
        document.getElementById("blockUnblock").className = "text-white btn btn-sm btn-success"
        document.getElementById("input-name").disabled = true
        // document.getElementById("input-email").disabled = true
        document.getElementById("input-nif").disabled = true
        // document.getElementById("input-phone").disabled = true
        document.getElementById("input-cidade").disabled = true
        document.getElementById("input-pais").disabled = true
        document.getElementById("filetag").disabled = true
        document.getElementById("atualizarConta").disabled = true
        document.getElementById("apagarConta").disabled = true
        document.getElementById("popUpEmail").classList.add("disabled");
        document.getElementById("popUpTel").classList.add("disabled");
        document.getElementById("popUpPass").classList.add("disabled");
    }

    function isOdd(n) {
        return Math.abs(n % 2) == 1;
    }
}

function getAllUsers() {
    fetch('https://environ-back.herokuapp.com/admin/users', {
        method: 'GET',
        credentials: 'include'
    }).then(async result => {
        var go = await result.json();
        return go;
    }).then(response => {
        var array = []
        console.log(response)
        response.forEach(element => {
            var obj = [];
            // if (!element.uid || element.uid === '') {
            //     obj.push('null')
            // } else {
            //     obj.push(element.uid)
            // }
            if (!element.name || element.name === '') {
                obj.push('null')
            } else {
                obj.push(element.name)
            }
            if (!element.email || element.email === '') {
                obj.push('null')
            } else {
                obj.push(element.email)
            }
            if (!element.phoneNumber || element.phoneNumber === '') {
                obj.push('null')
            } else {
                obj.push(element.phoneNumber)
            }
            if (!element.role || element.role === '') {
                obj.push('null')
            } else if (element.role === "empresa") {
                obj.push('Empresa')
            } else if (element.role === "camara") {
                obj.push('Câmara')
            } else if (element.role === "admin") {
                obj.push('Administrador')
            } else {
                obj.push(element.role)
            }
            if (!element.nif || element.nif === '') {
                obj.push('null')
            } else {
                obj.push(element.nif)
            }
            if (!element.country || element.country === '') {
                obj.push('null')
            } else {
                obj.push(element.country)
            }
            if (element.disabled === 'undefined' || element.disabled === '') {
                obj.push('null')
            } else if (element.disabled === false) {
                obj.push('Ativo')
            } else if (element.disabled === true) {
                obj.push('Desativo')
            }
            //   if(!element.city  || element.city === ''){ obj.push('null') } else { obj.push(element.city) }
            //   if(!element.setor || element.setor === ''){ obj.push('null') } else { obj.push(element.setor) }
            array.push(obj);
        });
        var table = $('#utilizadores').DataTable({
            data: array,
            language: {
                paginate: {
                    previous: "<i class='fas fa-angle-left'>",
                    next: "<i class='fas fa-angle-right'>"
                }
            }
        });
    })
}

//Eliminar Utilizador pelo ADMIN

function eliminarUtilizador() {
    var email = document.getElementById("email").value;
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    swalWithBootstrapButtons.fire({
        title: 'Tem a certeza?',
        text: "Está prestes a eliminar irreversivelmente o utilizador com o email: " + email + "!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sim, eliminar utilizador!',
        cancelButtonText: 'Não, cancelar!',
        reverseButtons: true
    }).then((result) => {
        if (result.value) {
            fetch('https://environ-back.herokuapp.com/admin/delete/user/', {
                method: 'DELETE',
                credentials: 'include',
                body: JSON.stringify({
                    email: email,
                })
            }).then(response => {
                return response.json();
            }).then(result => {
                location = location;
                console.log(result);
            }).catch(error => {
                console.log(error)
            })
            swalWithBootstrapButtons.fire(
                'Utilizador eliminado!',
                'O utilizador introduzido foi eliminado!',
                'success'
            ).then(function () {
                location.reload();
            })
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Cancelada',
                'Ação cancelada com sucesso',
                'error'
            )
        }
    })
}

//Ativar utilizador ADMIN
$("#email").on("change keyup paste", function () {
    var email = document.getElementById('email').value;

    var table = $('#utilizadores').DataTable();

    for (var i = 0; i < table.rows().data().length; i++) {
        var rows = table.rows(i).data();

        if (rows[0][1] == email && rows[0][3] == "Administrador") {
            document.getElementById('setAdmin').disabled = true;
        } else {
            document.getElementById('setAdmin').disabled = false;
        }

        if (rows[0][1] == email && rows[0][6] == "Ativo") {
            document.getElementById('ativarUser').disabled = true;
            if (rows[0][1] == email && rows[0][3] == "Administrador") {
                document.getElementById('setAdmin').disabled = true;
            } else {
                document.getElementById('setAdmin').disabled = false;
            }
            break;
        }
        else {
            document.getElementById('ativarUser').disabled = false;
        }
    }

})

function ativarUtilizador() {
    var email = document.getElementById("email").value;
    if (email == "") {
        document.getElementById("vazio").click();
    } else {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Tem a certeza?',
            text: "Está prestes a ativar o utilizador com o email: " + email + "!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, ativar utilizador!',
            cancelButtonText: 'Não, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                fetch('https://environ-back.herokuapp.com/admin/enable/user/', {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        email: email,
                    })
                }).then(response => {
                    return response.clone().json();
                }).then(result => {
                    console.log(result.msg);
                }).catch(error => {
                    console.log(error)
                })
                swalWithBootstrapButtons.fire(
                    'Utilizador ativado!',
                    'O utilizador introduzido foi novamente ativado no sistema!',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelada',
                    'Ação cancelada com sucesso',
                    'error'
                )
            }
        })
    }
}

//eliminar Utilizador pelo ADMIN


function eliminarUtilizador() {
    var email = document.getElementById("email").value;
    if (email == "") {
        document.getElementById("vazio").click();
    } else {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Tem a certeza?',
            text: "Está prestes a eliminar irreversivelmente o utilizador com o email: " + email + "!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, eliminar utilizador!',
            cancelButtonText: 'Não, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                fetch('https://environ-back.herokuapp.com/admin/delete/user/', {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        email: email,
                    })
                }).then(response => {
                    return response.json();
                }).then(result => {
                    console.log(result);
                }).catch(error => {
                    console.log(error)
                })
                swalWithBootstrapButtons.fire(
                    'Utilizador eliminado!',
                    'O utilizador introduzido foi eliminado!',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelada',
                    'Ação cancelada com sucesso',
                    'error'
                )
            }
        })
    }
}

//setAdmin PELO ADMIN

function setAdmin() {
    var email = document.getElementById("email").value;
    if (email == "") {
        document.getElementById("vazio").click();
    } else {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Tem a certeza?',
            text: "Está prestes a tornar administrador o utilizador com o email: " + email + "!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, tornar administrador!',
            cancelButtonText: 'Não, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                fetch('https://environ-back.herokuapp.com/admin/set', {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        email: email,
                    })
                }).then(response => {
                    return response.json();
                }).then(result => {
                    console.log(result.msg);
                }).catch(error => {
                    console.log(error)
                })
                swalWithBootstrapButtons.fire(
                    'Tipo de utilizador atualizado!',
                    'O utilizador introduzido passou a Administrador!',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelada',
                    'Ação cancelada com sucesso',
                    'error'
                )
            }
        })
    }
}

//Ativar

function emailActivationManually() {
    var email = document.getElementById("email").value;
    if (email === "") {
        document.getElementById("vazio").click();
    } else {
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        })
        swalWithBootstrapButtons.fire({
            title: 'Tem a certeza?',
            text: "Está prestes a verificar manualmente o utilizador com o email: " + email + "!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sim, verificar email!',
            cancelButtonText: 'Não, cancelar!',
            reverseButtons: true
        }).then((result) => {
            if (result.value) {
                fetch('https://environ-back.herokuapp.com/admin/accept/user', {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        email: email,
                    })
                }).then(response => {
                    return response.json();
                }).then(result => {
                    console.log(result.msg);
                }).catch(error => {
                    console.log(error)
                })
                swalWithBootstrapButtons.fire(
                    'Email verificado!',
                    'O utilizador foi verificado com sucesso!',
                    'success'
                )
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'Cancelada',
                    'Ação cancelada com sucesso',
                    'error'
                )
            }
        })
    }
}

function getNotifications() {
    fetch('https://environ-back.herokuapp.com/user/notifications', {
        method: 'GET',
        credentials: 'include'
    }).then(response => {
        return response.json()
    }).then(result => {
        if (result.msg) {
            document.getElementById('countNoti').style.visibility = "hidden";
            document.getElementById('numberNotifications').innerHTML = `<h6 class="text-sm text-muted m-0" style="text-align: center">${result.msg}</h6>`
        }
        else {
            if (result.length == 0) {
                document.getElementById('countNoti').style.visibility = "hidden";
            }
            else {
                document.getElementById('countNoti').style.visibility = "visible";
                document.getElementById('countNoti').innerHTML = result.length;
            }
            document.getElementById('numberNotifications').innerHTML = `<h6 class="text-sm text-muted m-0">Você tem <strong class="text-primary">${result.length}</strong> notificações por ler.
            </h6>`

            document.getElementById('contentNotification').innerHTML = ``;

            var count = 0;
            if (result.notifications.length > 4) {
                count = result.notifications.length - 5;
            }

            for (var i = result.notifications.length - 1; i >= count; i--) {
                var notification = result.notifications[i];

                var hours = Math.floor(((Date.now() - notification.date) % 86400000) / 3600000);
                var mins = Math.round((((Date.now() - notification.date) % 86400000) % 3600000) / 60000);
                var msgHours;
                if (hours < 1) msgHours = "há " + mins + " minutos atrás"
                else if (hours > 24) msgHours = "há mais de 24 horas atrás";
                else msgHours = "há " + hours + " horas atrás";
                if (notification.status == "unread") {
                    document.getElementById('contentNotification').innerHTML += `
                <a href="#!" id="${notification.notificationID}" onclick="readNotification(this, '${notification.type}')" class="list-group-item-read list-group-item-action">
                    <div class="row align-items-center">
                      <div class="col-auto">
                        <!-- Avatar -->
                        <img alt="Image placeholder" src="${notification.avatar}"
                          class="avatar rounded-circle">
                      </div>
                      <div class="col ml--2">
                        <div class="d-flex justify-content-between align-items-center">
                          <div>
                            <h4 class="mb-0 text-sm">${notification.from}</h4>
                          </div>
                          <div class="text-right text-muted">
                            <small>${msgHours}</small>
                          </div>
                        </div>
                        <p class="text-sm mb-0">${notification.msg}</p>
                      </div>
                    </div>
                  </a>
                `
                }
                else if (notification.status == "read") {
                    document.getElementById('contentNotification').innerHTML += `
                <a href="#!" id="${notification.notificationID}" onclick="readNotification(this, '${notification.type}')" class="list-group-item list-group-item-action">
                    <div class="row align-items-center">
                      <div class="col-auto">
                        <!-- Avatar -->
                        <img alt="Image placeholder" src="${notification.avatar}"
                          class="avatar rounded-circle">
                      </div>
                      <div class="col ml--2">
                        <div class="d-flex justify-content-between align-items-center">
                          <div>
                            <h4 class="mb-0 text-sm">${notification.from}</h4>
                          </div>
                          <div class="text-right text-muted">
                            <small>${msgHours}</small>
                          </div>
                        </div>
                        <p class="text-sm mb-0">${notification.msg}</p>
                      </div>
                    </div>
                  </a>
                `
                }
            };
        }
    })
}

function getAllNotifications() {
    fetch('https://environ-back.herokuapp.com/user/notifications', {
        method: 'GET',
        credentials: 'include'
    }).then(response => {
        return response.json()
    }).then(result => {
        if (result.msg) {
            document.getElementById('notifications').innerHTML = `<h6 class="text-sm text-muted m-0" style="text-align: center">${result.msg}</h6>`
        }
        else {
            document.getElementById('notifications').innerHTML = ``;
            for (var i = result.notifications.length - 1; i >= 0; i--) {
                var notification = result.notifications[i];

                var hours = Math.floor(((Date.now() - notification.date) % 86400000) / 3600000);
                var mins = Math.round((((Date.now() - notification.date) % 86400000) % 3600000) / 60000);
                var msgHours;
                if (hours < 1) msgHours = "há " + mins + " minutos atrás"
                else if (hours > 24) msgHours = "há mais de 24 horas atrás";
                else msgHours = "há " + hours + " horas atrás";
                if (notification.status == "unread") {
                    document.getElementById('notifications').innerHTML += `
                <a href="#!" id="${notification.notificationID}" onclick="readNotification(this, '${notification.type}')" class="list-group-item-read list-group-item-action">
                    <div class="row align-items-center">
                      <div class="col-auto">
                        <!-- Avatar -->
                        <img alt="Image placeholder" src="${notification.avatar}"
                          class="avatar rounded-circle">
                      </div>
                      <div class="col ml--2">
                        <div class="d-flex justify-content-between align-items-center">
                          <div>
                            <h4 class="mb-0 text-sm">${notification.from}</h4>
                          </div>
                          <div class="text-right text-muted">
                            <small>${msgHours}</small>
                          </div>
                        </div>
                        <p class="text-sm mb-0">${notification.msg}</p>
                      </div>
                    </div>
                  </a>
                `
                }
                else if (notification.status == "read") {
                    document.getElementById('notifications').innerHTML += `
                <a href="#!" id="${notification.notificationID}" onclick="readNotification(this, '${notification.type}')" class="list-group-item list-group-item-action">
                    <div class="row align-items-center">
                      <div class="col-auto">
                        <!-- Avatar -->
                        <img alt="Image placeholder" src="${notification.avatar}"
                          class="avatar rounded-circle">
                      </div>
                      <div class="col ml--2">
                        <div class="d-flex justify-content-between align-items-center">
                          <div>
                            <h4 class="mb-0 text-sm">${notification.from}</h4>
                          </div>
                          <div class="text-right text-muted">
                            <small>${msgHours}</small>
                          </div>
                        </div>
                        <p class="text-sm mb-0">${notification.msg}</p>
                      </div>
                    </div>
                  </a>
                `
                }
            }
        }
    }).catch(error => {
        console.log(error);
    })
}

function readNotification(element, type) {
    var notificationID = element.getAttribute("id");

    console.log(type)

    fetch('https://environ-back.herokuapp.com/user/read/notification', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ notificationID: notificationID })
    }).then(resp => {
        if (resp.ok) {
            if (type == "evento") {
                var user = JSON.parse(sessionStorage.getItem('user'));
                window.location.replace("../../../pages/" + user.role + "/eventos.html");
            }
        }
    })
}