import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuDEnFJ6qiZkMbO4KFcLvWnnvJKvZq_X4",
  authDomain: "react-cursos-b2549.firebaseapp.com",
  projectId: "react-cursos-b2549",
  storageBucket: "react-cursos-b2549.appspot.com",
  messagingSenderId: "770829186069",
  appId: "1:770829186069:web:6748b39d4625c67ce7ca1c"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);