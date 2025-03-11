// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXu5OJd8nDwXh36Z7WYEDvDD_ck4VUdSE",
  authDomain: "skejula-backend.firebaseapp.com",
  projectId: "skejula-backend",
  storageBucket: "skejula-backend.firebasestorage.app",
  messagingSenderId: "560391393810",
  appId: "1:560391393810:web:61dc6715bc01078180fecb",
  measurementId: "G-8KCMM712CT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);
