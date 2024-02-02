const signup = document.getElementById('signup');
const signupForm = document.getElementById('signupForm');
const url = window.location.href;

signup.addEventListener('click', function() {
    if (signupForm.style.display === 'none') {
        signupForm.style.display = 'block';
        signup.style.display = 'none';
        if(LogInForm.style.display === 'block'){
            LogInForm.style.display = 'none';
        }
        if(login.style.display = 'none'){
            login.style.display = 'block';
        }
    } else {
        signupForm.style.display = 'none';
        signup.style.display = 'none';
    }
});

const addsignupUser = document.querySelector("#signupForm");
const add_first_name = document.querySelector("#first_name");
const add_last_name = document.querySelector("#last_name");
const add_email = document.querySelector("#email");
const add_phone_number = document.querySelector("#phone_number");
const add_password = document.querySelector("#password");


addsignupUser.addEventListener("submit", async (e) => {
    e.preventDefault();
    const first_name  = add_first_name.value;
    const last_name  = add_last_name.value;
    const email  = add_email.value;
    const phone_number  = add_phone_number.value;
    const password  = add_password.value;

    const add_data = {
        first_name : first_name,
        last_name : last_name,
        email : email,
        phone_number : phone_number,
        password : password
   };

    try {
        const response = await fetch('/loginUsers/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(add_data)
        });
        if (response.ok) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Signed in successfully"
            }).then(function() {
                window.location = url+"home";
            });
        } else {
            response.text().then(errorMessage => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: errorMessage || "Something went wrong!",
                });
            }).catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            });
        }
    } catch (error) {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    // Handle network errors or other issues
    }
})

const login = document.getElementById('login');
const LogInForm = document.getElementById('LogInForm');

const checkLogin = document.querySelector("#LogInForm");
const add_loginEmail = document.querySelector("#loginEmail");
const add_loginPassword = document.querySelector("#loginPassword");

checkLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    const loginEmail  = add_loginEmail.value;
    const loginPassword  = add_loginPassword.value;

    const login_data = {
        loginEmail : loginEmail,
        loginPassword : loginPassword
    };

    try {
        const response = await fetch('/loginUsers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(login_data)
        });
        if (response.ok) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                toast.onmouseenter = Swal.stopTimer;
                toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Signed in successfully"
            }).then(function() {
                window.location = url+"home";
            });
        } else {
            console.error('Failed to submit data');
            response.text().then(errorMessage => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: errorMessage || "Something went wrong!",
                });
            }).catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            });
        }
    } catch (error) {
    Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    // Handle network errors or other issues
    }
    
})

login.addEventListener('click', function() {
    if (LogInForm.style.display === 'none') {
        LogInForm.style.display = 'block';
        login.style.display = 'none';
        if(signupForm.style.display === 'block'){
            signupForm.style.display = 'none';
        }
        if(signup.style.display = 'none'){
            signup.style.display = 'block';
        }
    } else {
        LogInForm.style.display = 'none';
        login.textContent = 'Show Form';
    }
});