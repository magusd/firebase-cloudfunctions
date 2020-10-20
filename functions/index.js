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