import * as firebase from "firebase";

const config = {
    apiKey: "AIzaSyAx4HprTgNXEndAi1S7aaxFhtSy-Odtt5o",
    authDomain: "ishelf-1.firebaseapp.com",
    databaseURL: "https://ishelf-1.firebaseio.com",
    projectId: "ishelf-1",
    storageBucket: "ishelf-1.appspot.com",
    messagingSenderId: "555644221221",
    appId: "1:555644221221:web:c140aab46341f7b3"
};

const fire = firebase.initializeApp(config);
export default fire;