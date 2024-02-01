const signup = document.getElementById('signup');
const signupForm = document.getElementById('signupForm');

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

addsignupUser.addEventListener("submit", async (e) => {
    e.preventDefault();
    alert("signupform")
})

const login = document.getElementById('login');
const LogInForm = document.getElementById('LogInForm');

const checkLogin = document.querySelector("#LogInForm");

checkLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    alert("checkLogin")
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