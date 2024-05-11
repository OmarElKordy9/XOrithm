// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCy15LL0SGmVvcF4uFuxxgu17zgZoFP3zc",
  authDomain: "xorithm-3ca51.firebaseapp.com",
  databaseURL: "https://xorithm-3ca51-default-rtdb.firebaseio.com",
  projectId: "xorithm-3ca51",
  storageBucket: "xorithm-3ca51.appspot.com",
  messagingSenderId: "14421180726",
  appId: "1:14421180726:web:211f0f6b6b934609f4f397",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth();
export { app, auth, database };
