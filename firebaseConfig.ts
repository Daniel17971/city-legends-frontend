import { initializeApp }from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "city-legends-19cb4.firebaseapp.com",
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: "city-legends-19cb4",
  storageBucket: "city-legends-19cb4.appspot.com",
  messagingSenderId: "1021424180412",
  appId: "1:1021424180412:web:e67b2c1818721c7f5504b9",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
