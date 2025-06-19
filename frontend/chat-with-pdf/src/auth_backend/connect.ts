// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3ajt2catMO8SiucLUcNYyDf_zlAsom9w",
  authDomain: "askify---chat-with-pdf.firebaseapp.com",
  projectId: "askify---chat-with-pdf",
  storageBucket: "askify---chat-with-pdf.firebasestorage.app",
  messagingSenderId: "880845637386",
  appId: "1:880845637386:web:e6b66a9f3c00373c56dcf3",
  measurementId: "G-SNG0CSL136"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);