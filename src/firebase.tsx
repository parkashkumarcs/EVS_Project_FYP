import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"; // Import Firebase Storage

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyBucEccG9YaWQPp6TauGIicC4IkSiqgmzY",
  authDomain: "sibau-evs.firebaseapp.com",
  databaseURL: "https://sibau-evs-default-rtdb.firebaseio.com",
  projectId: "sibau-evs",
  storageBucket: "sibau-evs.appspot.com", // Storage bucket for Firebase Storage
  messagingSenderId: "19638382266",
  appId: "1:19638382266:web:f7b266d1f50f5d1e42dc83",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore, Auth, and Storage
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // Initialize Firebase Storage

// Exporting initialized instances for use in other parts of the app
export { db, auth, storage, app };
