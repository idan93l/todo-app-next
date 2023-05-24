import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA1VTWZNjZuAwP2160MCs8exmM5fsRtNp0",
  authDomain: "todo-app-next-387a9.firebaseapp.com",
  projectId: "todo-app-next-387a9",
  storageBucket: "todo-app-next-387a9.appspot.com",
  messagingSenderId: "125178577875",
  appId: "1:125178577875:web:41131af959d18df686e526",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
