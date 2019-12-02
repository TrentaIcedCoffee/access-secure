import * as functions from "firebase-functions";

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!\n\n");
});

export const receiveLog = functions.https.onRequest((request, response) => {
  var email = request.get("Email");
  console.log(email);
  response.send(request.query.name);
});
