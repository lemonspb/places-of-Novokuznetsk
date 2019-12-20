import * as firebase from "firebase/app";
import "firebase/database";
import 'firebase/storage';

  const firebases = firebase.initializeApp({
    apiKey: "AIzaSyD9IWx-QNTq10WLZndwrT2k1vBfCjnfZXk",
    authDomain: "novokeznetsk-map-place-misha.firebaseapp.com",
    databaseURL: "https://novokeznetsk-map-place-misha.firebaseio.com",
    projectId: "novokeznetsk-map-place-misha",
    storageBucket: "novokeznetsk-map-place-misha.appspot.com",
    messagingSenderId: "759687931536",
    appId: "1:759687931536:web:ecba30c75a034651629a15"
  });
  
  export default firebases;