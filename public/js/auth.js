const authSwitchLink = document.querySelectorAll('.switch');
const authModals = document.querySelectorAll('.auth .modal');
const authWrapper = document.querySelector('.auth');
const registerForm = document.querySelector('.register');
const loginForm = document.querySelector('.login');
const signOut = document.querySelector('.sign-out');
//toggle auth modals

authSwitchLink.forEach(link => {
    link.addEventListener('click', () => {
        authModals.forEach( modal => modal.classList.toggle('active'))
    })
})

//register
registerForm.addEventListener('submit', e=>{
    e.preventDefault();
    const email = registerForm['email'].value;
    const password = registerForm['password'].value;
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( 
        user => {
            console.log('registered');
            registerForm.reset(); 
        },
        error => {
            registerForm.querySelector('.error').textContent = error.message;
        })
});

//login
loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = loginForm['email'].value;
    const password = loginForm['password'].value;
    firebase.auth().signInWithEmailAndPassword(email,password)
    .then(
        user => {
            console.log(user);
            loginForm.reset();
        },
        error => {
            loginForm.querySelector('.error').textContent = error.message;
        }
    );
});

//sign out
signOut.addEventListener('click', e => {
    firebase.auth().signOut()
    .then(()=>{
        console.log('signed out');
    })
});

//auth listener
firebase.auth().onAuthStateChanged(user => {
    if(user){
        authWrapper.classList.remove('open');
    }else{
        authWrapper.classList.add('open');
        authModals[0].classList.add('active');
    }
});