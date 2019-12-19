import * as firebase from "firebase/app";
import "firebase/database";
import 'firebase/storage';

  const firebases = firebase.initializeApp({
    apiKey: "AIzaSyAh8Ty4OuyYgNrUu-L6XWPwCxz2xzmTI94",
    authDomain: "movie-data-base-6aa03.firebaseapp.com",
    databaseURL: "https://movie-data-base-6aa03.firebaseio.com",
    projectId: "movie-data-base-6aa03",
    storageBucket: "movie-data-base-6aa03.appspot.com",
    messagingSenderId: "349367913440",
    appId: "1:349367913440:web:acdf1c2bf0823574cb7985",
    measurementId: "G-70TFLLYZ9W"
  });
  
  export default firebases;