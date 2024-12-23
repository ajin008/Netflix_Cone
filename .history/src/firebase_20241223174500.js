import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAUlO6lJDOyzZjoPV6pwRcOlCQwJWTfSrM",
  authDomain: "netflix-clone-b8a5e.firebaseapp.com",
  projectId: "netflix-clone-b8a5e",
  storageBucket: "netflix-clone-b8a5e.firebasestorage.app",
  messagingSenderId: "75165771678",
  appId: "1:75165771678:web:b83297a625845ec1f3188f",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log(user);
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code);
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[]);
  }
};

const logout = () => {
  signOut(auth);
};

export { auth, db, login, signup, logout };
