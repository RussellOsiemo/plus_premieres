// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { } from 'firebase/database';
import { getMessaging, getToken} from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD1R7YXAEqFxs7JYz9IS0iNUA3dS4bZlxk",
  authDomain: "pluschat-4d2a3.firebaseapp.com",
  projectId: "pluschat-4d2a3",
  storageBucket: "pluschat-4d2a3.appspot.com",
  messagingSenderId: "904651604947",
  appId: "1:904651604947:web:909990a26aa922dcc66526",
  measurementId: "G-BPWW9QYP27"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Initialize Firebase Cloud Messaging and get a reference to the service
const messaging = getMessaging(app);
// Add the public key generated from the console here.
getToken(messaging, {vapidKey: "BLL0yWArK9ntcIfH9r10XZMSeFQbqgTF9BAU4mYFOYf8EE2r-ME0rLrahm2nIBKVMQX_EwatW5TAoFdD8ana83I"});
