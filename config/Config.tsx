import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";



const firebaseConfig = {
  apiKey: "AIzaSyAJhfENLWzFo7RCiGXdThovD_REkXz92-Y",
  authDomain: "movilesapp-fb56e.firebaseapp.com",
  databaseURL: "https://movilesapp-fb56e-default-rtdb.firebaseio.com",
  projectId: "movilesapp-fb56e",
  storageBucket: "movilesapp-fb56e.firebasestorage.app",
  messagingSenderId: "704458714145",
  appId: "1:704458714145:web:91cd0ea76df02f9ed7c760"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
