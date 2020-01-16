import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD5dREguYCWhOfBIR2A-0_xp7zCipO6l08',
  authDomain: 'logsystem-2ada2.firebaseapp.com',
  databaseURL: 'https://logsystem-2ada2.firebaseio.com',
  projectId: 'logsystem-2ada2',
  storageBucket: 'logsystem-2ada2.appspot.com',
  messagingSenderId: '439970797071',
  appId: '1:439970797071:web:cf254be345c10a0c19f57a',
  measurementId: 'G-HMD3CH718X'
};

const firebase = app.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

export default firebase;
export { auth, db };