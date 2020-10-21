const requestModal = document.querySelector('.new-request');
const requestLink = document.querySelector('.add-request');
const requestForm = document.querySelector('.new-request form');

requestLink.addEventListener('click', ()=>{
    requestModal.classList.add('open');
});

requestModal.addEventListener('click', (e)=>{
    if (e.target.classList.contains('new-request')){
        requestModal.classList.remove('open');
    }
});


//new request
requestForm.addEventListener('submit', e => {
    e.preventDefault();
    const addRequest = firebase.functions().httpsCallable('addRequest');

    addRequest({
        text: requestForm['request'].value,
        upvotes: 0
    })
    .then(()=>{
        requestForm.reset();
        requestModal.classList.remove('open');
        requestForm.querySelector('.error').textContent = '';
    }, error =>{
        console.log(error);
        requestForm.querySelector('.error').textContent = error.message;
    });
});