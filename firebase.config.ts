// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAT9RePU6xfF1yQYgthE_9AahYdL2F20MQ",
  authDomain: "final-year-attendance-system.firebaseapp.com",
  projectId: "final-year-attendance-system",
  storageBucket: "final-year-attendance-system.appspot.com",
  messagingSenderId: "706038385995",
  appId: "1:706038385995:web:3675102206dc444f06ecce",
  measurementId: "G-KRC6XCRQGV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
