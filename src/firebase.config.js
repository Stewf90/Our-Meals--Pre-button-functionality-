import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore"

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAiCXdnFIcUYea4AnHlfj1BH6NHDUpwDTY",
  authDomain: "mealplanner-619c6.firebaseapp.com",
  projectId: "mealplanner-619c6",
  storageBucket: "mealplanner-619c6.appspot.com",
  messagingSenderId: "865159742187",
  appId: "1:865159742187:web:46871909717865cb0cf4ae"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const storage = getStorage(app)
