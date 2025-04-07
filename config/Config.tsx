import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";



const firebaseConfig = {
  apiKey: "AIzaSyD0vhBqlEwO9SdqS2KCsNKARNOdNmmXklc",
  authDomain: "plataformaeducativa-e7a1c.firebaseapp.com",
  projectId: "plataformaeducativa-e7a1c",
  storageBucket: "plataformaeducativa-e7a1c.firebasestorage.app",
  messagingSenderId: "299675403002",
  appId: "1:299675403002:web:b0a3b4c927242c5be9ff43",
  measurementId: "G-290KNMS9XR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
