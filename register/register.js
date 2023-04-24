let registerName = document.querySelector(".register_name");
let registerEmail = document.querySelector(".register_email");
let registerPsw = document.querySelector(".register_psw");
let registerConfrmPsw = document.querySelector(".register_confrm_psw");
let registerErr = document.querySelector(".register_err");

function registerSubmit(e) {
  e.preventDefault();

  //   if (
  //     registerName.value !== "" &&
  //     registerEmail.value !== "" &&
  //     registerPsw.value !== "" &&
  //     registerConfrmPsw.value !== ""
  //   ) {

  //   }else{
  //     registerErr.innerHTML='Xanalari doldurun'
  //   }

  let chechNewUser = users.find((data) => data.email === registerEmail.value);
  if (!chechNewUser) {
   if(registerConfrmPsw.value===registerPsw.value){
    const newUser = {
        id: users.length + 1,
        userName: registerName.value,
        email: registerEmail.value,
        password: registerPsw.value,
      };
      users.push(newUser);
      registerErr.innerHTML = "Qeydiyyat ygyrla bitdi";
      localStorage.setItem('users', JSON.stringify(users))
   }else{
    registerErr.innerHTML = "Sifre eyni deyil";
   }
  } else {
    registerErr.innerHTML = "Istifadeci movcuddur";
  }
}

goRegister.addEventListener('click', ()=>{
  window.location.href="../login/login.html"
})