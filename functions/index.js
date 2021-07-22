const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const cors = require('cors')({ origin: true });
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
const {
    PubSub
} = require('@google-cloud/pubsub');

exports.cronSchedule = functions.pubsub.schedule('*/1 * * * *').onRun((context) => {

    var id = "doc1";

    var info = {
        name: "Armando",
        lastname: "Zabala",
        date: new Date(),
    };

    db.collection("jobLog").add(info).then((docRef) => {
        console.log("save log: " + docRef);
        return true;
    }).catch((err) => {
        console.log(err);
        return err;
    });

    return true;

});

exports.helloWorld = functions.https.onRequest((request, response) => {

    cors(request, response, () => {


        var id = "doc1";

        var info = {
            name: "Armando",
            lastname: "Zabala"
        };

        db.collection("jobLog").add(info).then((docRef) => {
            console.log("save log: " + docRef);
            return true;
        }).catch((err) => {
            console.log(err);
            return err;
        });


        response.send("Hello from Firebase!");

    });
});