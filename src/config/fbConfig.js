import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/auth';

var firebaseConfig = {
  apiKey: "AIzaSyD_q9fHrUSydtO2kj_lzV9xUzRQZheqRgA",
  authDomain: "coval-3c340.firebaseapp.com",
  databaseURL: "https://coval-3c340.firebaseio.com",
  projectId: "coval-3c340",
  storageBucket: "coval-3c340.appspot.com",
  messagingSenderId: "98186336113",
  appId: "1:98186336113:web:404fdf9b8c2bfb5bce08d0",
  measurementId: "G-HMX3NTQ002"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase
