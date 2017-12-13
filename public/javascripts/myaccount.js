const creditCardForm = document.querySelector('#creditCardForm');

creditCardForm.addEventListener('submit', (e) => {
    e.preventDefault()
    post('/myaccount/cc', '#creditCardForm');
})

function post (path, formid) {
    console.log("posting to "+ path +": "+ $(formid).serialize());
    $.ajax({
        type: "POST",
        url: path,
        data: $(formid).serialize(),
        success: function(msg) {
            alert(msg);
        }
    });
}