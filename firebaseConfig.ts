require("dotenv").config({
  path: `${__dirname}/.env.test`,
});
// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getDatabase } = require("firebase/database");
const admin = require("firebase-admin");
const { serviceAccount } = require("./admin/admin");

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "city-legends-19cb4.firebaseapp.com",
  databaseURL: process.env.DATABASE_URL,
  projectId: "city-legends-19cb4",
  storageBucket: "city-legends-19cb4.appspot.com",
  messagingSenderId: "1021424180412",
  appId: "1:1021424180412:web:e67b2c1818721c7f5504b9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//Initialize Auth
const auth = getAuth(app);
