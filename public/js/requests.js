var app = new Vue({
    el: '#app',
    data: {
        requests: []
    },
    methods: {
        upvoteRequest(id){
            const upvote = firebase.functions().httpsCallable('upvote');
            upvote({ id }).then(
                ()=>{},
                error=>{
                    console.log(error.message);
                    showNotification(error.message);
                }
            )
        }
    },
    mounted(){
        const ref = firebase.firestore().collection('requests').orderBy('upvotes','desc');
        ref.onSnapshot(snapshot => {
            let requests = [];
            snapshot.forEach( doc => {
                requests.push({...doc.data(), id: doc.id});
            });
            this.requests = requests;
        });       
        
    }
});


const notification = document.querySelector('.notification');
const showNotification = (message) => {
    notification.textContent = message;
    notification.classList.add('active');
    setTimeout(()=>{
        notification.classList.remove('active');
        notification.textContent = '';
    }, 2000)
}