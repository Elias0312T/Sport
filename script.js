// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUDnQCtE7PoquOGjArchkZaYZJmT7oRBY",
  authDomain: "elias-fitness-friends.firebaseapp.com",
  projectId: "elias-fitness-friends",
  storageBucket: "elias-fitness-friends.firebasestorage.app",
  messagingSenderId: "387221074867",
  appId: "1:387221074867:web:9538df426a919c3be811c6",
  measurementId: "G-SFNTN78BYT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
