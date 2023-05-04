import { initializeApp }from "firebase/app";

import {API_KEY, DATABASE_URL} from "./firebase-keys";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "city-legends-19cb4.firebaseapp.com",
  databaseURL: DATABASE_URL,
  projectId: "city-legends-19cb4",
  storageBucket: "city-legends-19cb4.appspot.com",
  messagingSenderId: "1021424180412",
  appId: "1:1021424180412:web:e67b2c1818721c7f5504b9",
};

export const app = initializeApp(firebaseConfig);