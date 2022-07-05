// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBv3in7uPlsG-mSvH_xSByLLW9M6-kK2Wg",
  authDomain: "meta-test-d5ee3.firebaseapp.com",
  projectId: "meta-test-d5ee3",
  storageBucket: "meta-test-d5ee3.appspot.com",
  messagingSenderId: "509525582396",
  appId: "1:509525582396:web:077da523192ea3a0bfd939",
  measurementId: "G-3MEM4Y3CVW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
//const analytics = getAnalytics(app);