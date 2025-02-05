const doLogin = function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    login({
        username: username,
        password: password
    }).then(function(res) {
        window.location.href = 'home.html';
    })
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

    register({
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        birthdate: birthdate,
        email: email,
        username: username,
        password: password
    }).then(function(res) {
        window.location.href = "home.html";
    })
}

const doLogout = function(e) {
    e.preventDefault;
}