import firebase, { firestore } from "firebase";

const config = {
  apiKey: "AIzaSyD5dREguYCWhOfBIR2A-0_xp7zCipO6l08",
  authDomain: "logsystem-2ada2.firebaseapp.com",
  databaseURL: "https://logsystem-2ada2.firebaseio.com",
  projectId: "logsystem-2ada2",
  storageBucket: "logsystem-2ada2.appspot.com",
  messagingSenderId: "439970797071",
  appId: "1:439970797071:web:cf254be345c10a0c19f57a",
  measurementId: "G-HMD3CH718X"
};
// Initialize Firebase
const fire = firebase.initializeApp(config);
const db = fire.firestore(config);

export default fire;

// Here are some usage of firestore
// Below is use case of db
// init db: db: fire.firestore(),
// addToDB = () => {
//   this.state.db
//     .collection("users").doc(this.state.uid)
//     .add({ //For add new doc
//       Ip: "TestIp",
//       Username: "testUser"
//     })
//     .then(function(docRef) {
//       console.log("Document written with ID: ", docRef.id);
//     })
//     .catch(function(e) {
//       console.error("Error adding document: ", e);
//     });
// };
// .add() === .doc.set()
// .set({password: 123486,love: "code"},{ merge: true }) to Merge on exist/noexist doc
// .update = .set({},{merge:true}); In update, we can use {"apiki.app1"} to ref to its' value
//  .delete() will delete that doc
//
