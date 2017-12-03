const RegisterUser = document.querySelector('#registrationForm');
RegisterUser.addEventListener('submit', (e) => {
    e.preventDefault()
    const name = RegisterUser.querySelector('#name').value
    const address = RegisterUser.querySelector('#address').value
    const email = RegisterUser.querySelector('#email').value
    const phone = RegisterUser.querySelector('#phone').value
    const password = RegisterUser.querySelector('#password').value
    const confpassword = RegisterUser.querySelector('#confpassword').value
    post('/registerUser', { name, address, email, phone, password, confpassword })
    document.querySelector('#registrationForm').reset();
})

function post (path, data) {
    console.log("Posting:\npath: "+path +"\n data: "+JSON.stringify(data)+"\n");
    return window.fetch(path, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}