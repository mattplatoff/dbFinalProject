const creditCardForm = document.querySelector('#creditCardForm');
const editInfoForm = document.querySelector('#editInfoForm');
const reviewForm = document.querySelector('#reviewForm');
creditCardForm.addEventListener('submit', (e) => {
    e.preventDefault()
    post('/myaccount/cc', '#creditCardForm');
})

editInfoForm.addEventListener('submit', (e) => {
    e.preventDefault()
    post('/myaccount/editInfo', '#editInfoForm');
})

reviewForm.addEventListener('submit', (e) => {
    e.preventDefault()
    post('/myaccount/review', '#reviewForm');
})

function post (path, formid) {
    console.log("posting to "+ path +": "+ $(formid).serialize());
    $.ajax({
        type: "POST",
        url: path,
        data: $(formid).serialize(),
        success: function(msg) {
            alert(msg);
            window.location.href = window.location.href;
        }
    });
}