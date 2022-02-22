import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import { initializeApp } from "@firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJPYqGMyE00ntPSECN9DbqXuR2kFbpmzM",
  authDomain: "acart-2df86.firebaseapp.com",
  projectId: "acart-2df86",
  storageBucket: "acart-2df86.appspot.com",
  messagingSenderId: "313818473378",
  appId: "1:313818473378:web:da48eca1399398e26508fb",
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);
export default firebase;
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
