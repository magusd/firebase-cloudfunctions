const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.randomNumber = functions.https.onRequest((request, response) => {
    const number = Math.round(Math.random() * 100);
    functions.logger.log("Hello from info. Here's the number:", number);
    console.log("Hello from info. Here's the number:", number);
    response.send(number.toString());
});

exports.toTheDojo = functions.https.onRequest((request, response) => {
    response.redirect('https://google.com/?q=vitor.lobs');
});

exports.sayHello = functions.https.onCall((data,context) => {
    console.log(data.name);
    return `Hello ninjas`;
});