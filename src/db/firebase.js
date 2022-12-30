import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBlTQl1VydAlz2jiIBzLhor",
  authDomain: "ecommerce-logan-2964.firebaseapp.com",
  projectId: "ecommerce-logan-2964",
  storageBucket: "ecommerce-logan-2964.appspot.com",
  messagingSenderId: "1033963929",
  appId: "1:1033963926929:web:df80bef3ffb405ddd30",
  measurementId: "G-W2ZE6LY1L6"
};

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const storage = getStorage();
const analytics = getAnalytics();

export { auth, db, storage, analytics };
