// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANP2Z01VN5AW7KFIcGClb1gWtFsc2Xvqg",
  authDomain: "react-note-app-37450.firebaseapp.com",
  projectId: "react-note-app-37450",
  storageBucket: "react-note-app-37450.appspot.com",
  messagingSenderId: "745420022098",
  appId: "1:745420022098:web:4ec3080594bc38e6799a8b",
  measurementId: "G-7YNMNSF12Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);