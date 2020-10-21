const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.newUserSignup = functions.auth.user().onCreate(user=>{
    return admin.firestore().collection('users').doc(user.uid).set({
        email: user.email,
        upvotedOn: []
    });
});

exports.userDeleted = functions.auth.user().onDelete(user=>{
    return admin.firestore().collection('users').doc(user.uid).delete();
});

// http callable function
exports.addRequest = functions.https.onCall((data, context) => {
    if(!context.auth){
        throw new functions.https.HttpsError(
            'unauthenticated',
            'only authenticated users can add requests'
            );
    }
    if(data.text.length > 30){
        throw new functions.https.HttpsError(
            'invalid-argument',
            'request must be no more then 30 characters long'
        )
    }
    return admin.firestore().collection('requests').add({
        text: data.text,
        upvotes: 0,
    });

});

exports.upvote = functions.https.onCall((data, context) => {
    //check auth
    if(!context.auth){
        throw new functions.https.HttpsError(
            'unauthenticated',
            'only authenticated users can add requests'
            );
    }
    const user = admin.firestore().collection('users').doc(context.auth.uid);
    const request = admin.firestore().collection('requests').doc(data.id);

    return user.get().then( doc => {
        // check if the user hasn't upvoted
        if(doc.data().upvotedOn.includes(data.id)){
            throw new functions.https.HttpsError(
                'failed-precondition',
                'You can only upvote a request once'
            );       
        }
        //update user array
        return user.update({
            upvotedOn: [...doc.data().upvotedOn, data.id]
        })
    }).then( () => {
        //updates votes on the request
        return request.update({upvotes: admin.firestore.FieldValue.increment(1)
        });
    });
    
})