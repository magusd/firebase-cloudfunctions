const requestModal = document.querySelector('.new-request');
const requestLink = document.querySelector('.add-request');


requestLink.addEventListener('click', ()=>{
    requestModal.classList.add('open');
});

requestModal.addEventListener('click', (e)=>{
    if (e.target.classList.contains('new-request')){
        requestModal.classList.remove('open');
    }
});

//say hello function
const button = document.querySelector('.call');

button.addEventListener('click', ()=>{
    console.log('asd')
    const sayHello = firebase.functions().httpsCallable('satHello');
    sayHello({name:"lobs"}).then(result => {
        console.log(result.data);
    })
});