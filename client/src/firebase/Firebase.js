import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAhARuwzHzD4Unv-r1-Y5zsUV6jeKYGNEM",
  authDomain:"janch-130d6.firebaseapp.com",
  databaseURL: "https://janch-130d6.firebaseio.com",
  projectId: "janch-130d6",
  storageBucket: "janch-130d6.appspot.com",
  messagingSenderId: "772229712532",
  appId: "1:772229712532:web:bf86c47b8ddd11465fc281"
});

export default firebaseApp;