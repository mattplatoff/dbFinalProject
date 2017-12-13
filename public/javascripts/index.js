const RegisterUser = document.querySelector('#registrationForm');
RegisterUser.addEventListener('submit', (e) => {
    e.preventDefault()

    post('/registerUser', '#registrationForm');
    document.querySelector('#registrationForm').reset();
})

const Login = document.querySelector('#signin');
Login.addEventListener('submit', (e) => {
    e.preventDefault()

    post('/login', '#signin');
    document.querySelector('#registrationForm').reset();
})

function logout(){
    $.ajax({
        type: "POST",
        url: '/index/signout',
        success: function(msg) {
            window.location.href = window.location.href;            
        }
    });    
}

function post (path, formid) {
    console.log("posting "+ $(formid).serialize());
    $.ajax({
        type: "POST",
        url: path,
        data: $(formid).serialize(),
        success: function(msg) {
            alert("Form Submitted: " + msg);
            window.location.href = window.location.href;            
        }
    });

}