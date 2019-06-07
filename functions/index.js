const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

exports.helloWorld = functions.https.onRequest((req, res) => {
  res.send("Hello from Firebase!");
});

exports.pushNotifications = functions.https.onRequest((req, res)  => {
  var oneSignalUserId = req.body.oneSignalUserId;
  var userID = req.body.userID;
  var userEmail = req.body.userEmail;

  var editPlayer = function(data) {
    var headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": "Basic ODdmZjJmYzQtMjhhNS00YjkwLWI4NDctZDU4ZmYyZThhYmRj"
    };

    var options = {
      host: "onesignal.com",
      port: 443,
      path: "/api/v1/players/" + oneSignalUserId,
      method: "PUT",
      headers: headers
    };

    var https = require('https');
    var req = https.request(options, function(res) {
      res.on('data', function(data) {
        console.log("Response:");
        console.log(JSON.parse(data));
      });
    });

    req.on('error', function(e) {
      console.log("ERROR:");
      console.log(e);
    });

    req.write(JSON.stringify(data));
    req.end();
  };

  var message = {
    app_id: "43e80f6d-7cf6-4c3c-808f-bf832ddb63f7 ",
    tags: {
      "userId": userId,
      "userEmail": userEmail
    }
  };

  editPlayer(message);

  var newUserRef = admin.database().ref('/users/' + userId).push();
  newUserRef.set({
    "oneSignalUserId": oneSignalUserId
  });


});
