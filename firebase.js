

// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database"; // ✅ Import this
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyBjakTA-PCCItKdkjtQeXFvjKbgYsRH4xc",
  authDomain: "taskchsat.firebaseapp.com",
  projectId: "taskchsat",
  storageBucket: "taskchsat.firebasestorage.app",
  messagingSenderId: "601372505709",
  appId: "1:601372505709:web:9b47afe22c3b2411de3164",
  measurementId: "G-FZ9MYGFN1D"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase(app); // ✅ Initialize db
const analytics = getAnalytics(app);


export { auth, provider, db,analytics }; // ✅ Export db

