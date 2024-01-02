// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCW_B_FxyCh1aRf9wnLkaTanuD8LgDNnZc",
  authDomain: "chat-app-fe07b.firebaseapp.com",
  projectId: "chat-app-fe07b",
  storageBucket: "chat-app-fe07b.appspot.com",
  messagingSenderId: "540728009542",
  appId: "1:540728009542:web:0bddcbaf231347d3213b47"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default firebaseConfig