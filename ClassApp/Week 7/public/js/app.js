const doLogin = function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    authService.login({
        username: username,
        password: password
    }).then(function(res) {  
        const token = res.headers.get('auth-token');
        if (token != null) {
            localStorage.setItem('access_token', token);
            localStorage.setItem('isAuth', true);
        }
        window.location.href = TODO_HTML;
    }).catch(function(error) { 
        console.error("Login failed:", error);
        const errorMessage = document.getElementById('loginError');
        errorMessage.innerText = error.message;
    });
}

const doRegister = function(e) {
    e.preventDefault;
    const firstName = document.getElementById('firstname').value
    const middleName = document.getElementById('middlename').value
    const lastName = document.getElementById('lastname').value
    const birthdate = document.getElementById('birthdate').value
    const email = document.getElementById('email').value
    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    authService.register({
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        birthdate: birthdate,
        email: email,
        username: username,
        password: password
    }).then(function(res) {
        window.location.href = TODO_HTML;
    })
}

const doLogout = function(e) {
    e.preventDefault;
    console.log("Attempting to logout");
    authService.logout();
}

if (typeof todo !== 'undefined') {
    todo.init();
}