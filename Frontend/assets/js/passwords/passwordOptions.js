var verification;
function CheckPasswordStrength(password) {
    var password_strength = document.getElementById("password_strength");


    //if textBox is empty
    if (password.length == 0) {
        password_strength.innerHTML = "";
        return;
    }

    //Regular Expressions
    var regex = new Array();
    regex.push("[A-Z]"); //For Uppercase Alphabet
    regex.push("[a-z]"); //For Lowercase Alphabet
    regex.push("[0-9]"); //For Numeric Digits
    regex.push("[$@$!%*#?&]"); //For Special Characters

    var passed = 0;

    //Validation for each Regular Expression
    for (var i = 0; i < regex.length; i++) {
        if ((new RegExp(regex[i])).test(password)) {
            passed++;
        }
    }

    //Validation for Length of Password
    if (passed >= 3 && password.length >= 8) {
        passed++;
        this.verification = true;
        //       document.getElementById("register").disabled = false;
    }
    else {
        this.verification = false;
    }
    //   else {
    //       document.getElementById("register").disabled = true;
    //   }
    //Display of Status
    var color = "";
    var passwordStrength = "";
    switch (passed) {
        case 0:
            break;
        case 1:
            passwordStrength = "Péssima";
            color = "badge badge-pill badge-danger";
            break;
        case 2:
            passwordStrength = "Fraca";
            color = "badge badge-pill badge-warning";
            break;
        case 3:
            passwordStrength = "Aceitável";
            color = "badge badge-pill badge-info";
            break;
        case 4:
            passwordStrength = "Forte";
            color = "badge badge-pill badge-default";
            break;
        case 5:
            passwordStrength = "Muito forte";
            color = "badge badge-pill badge-success";
            break;
    }
    password_strength.innerHTML = passwordStrength;
    password_strength.className += color;
    return verification;
}

function visible() {
    var x = document.getElementById("registerPassword");
    var y = document.getElementById("eye");
    if (x.type === "password") {
        x.type = "text";
        y.className = "far fa-eye-slash";
    } else {
        x.type = "password";
        y.className = "far fa-eye"
    }
}


function visibleForm() {
    var x = document.getElementById("passwordAlt");
    var y = document.getElementById("eye");
    if (x.type === "password") {
        x.type = "text";
        y.className = "far fa-eye-slash";
    } else {
        x.type = "password";
        y.className = "far fa-eye"
    }
}

function onOut() {
    console.log("YOLO")
    console.log(this.verification)
    if (this.verification == false) {
        console.log("YOLO")
        document.getElementById("WORKING").click();
    }
}