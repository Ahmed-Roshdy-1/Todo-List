// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqdKGCJEBaYvFjiWCO0CoEdpZL1gaqw4o",
  authDomain: "todo-f713c.firebaseapp.com",
  projectId: "todo-f713c",
  storageBucket: "todo-f713c.appspot.com",
  messagingSenderId: "116992441451",
  appId: "1:116992441451:web:0429c41fec8c13e8a9c52e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
