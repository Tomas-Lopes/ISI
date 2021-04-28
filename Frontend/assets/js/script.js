function viewPassword()
{
  var passwordInput = document.getElementById('password-field');
  var passStatus = document.getElementById('pass-status');
 
  if (passwordInput.type == 'password'){
    passwordInput.type='text';
    passStatus.className='fa fa-eye-slash';
    
  }
  else{
    passwordInput.type='password';
    passStatus.className='fa fa-eye';
  }
}
function confirmPassword()
{
  var passwordInput = document.getElementById('password-confirm');
  var passStatus = document.getElementById('pass-confirm');
 
  if (passwordInput.type == 'password'){
    passwordInput.type='text';
    passStatus.className='fa fa-eye-slash';
    
  }
  else{
    passwordInput.type='password';
    passStatus.className='fa fa-eye';
  }
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
