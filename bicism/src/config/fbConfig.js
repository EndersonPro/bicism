import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Firebase
var config = {
    apiKey: "AIzaSyCQ3t_v_yuyNHJ1WnRLfPtbaXjAtJqYXxo",
    authDomain: "reactnativejp.firebaseapp.com",
    databaseURL: "https://reactnativejp.firebaseio.com",
    projectId: "reactnativejp",
    storageBucket: "reactnativejp.appspot.com",
    messagingSenderId: "418724950807"
};

firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true })

export default firebase;