import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAvByMVEZTwdRhjnTJJ5hmBuMgf275v7q0",
  authDomain: "y3s2-af-assignment02.firebaseapp.com",
  projectId: "y3s2-af-assignment02",
  storageBucket: "y3s2-af-assignment02.appspot.com",
  messagingSenderId: "506788734255",
  appId: "1:506788734255:web:24a09b2c2df19b8d05adda"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)



export { app, auth };
