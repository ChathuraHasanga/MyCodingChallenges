//Hardcoded user credentials
const users = [
    {username: 'user1', password: 'password1'},
    {username: 'user2', password: 'password2'}
];

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    //check if the entered credentials match any user
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        message.textContent = 'Login successful!';
        message.style.color = 'green';
        message.style.textAlign = 'center';
    }else {
        message.textContent = 'Invalid username or password.';
        message.style.color = 'red';
        message.style.textAlign = 'center';
    }
}