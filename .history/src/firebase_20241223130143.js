import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth/cordova";

const firebaseConfig = {
  apiKey: "AIzaSyAUlO6lJDOyzZjoPV6pwRcOlCQwJWTfSrM",
  authDomain: "netflix-clone-b8a5e.firebaseapp.com",
  projectId: "netflix-clone-b8a5e",
  storageBucket: "netflix-clone-b8a5e.firebasestorage.app",
  messagingSenderId: "75165771678",
  appId: "1:75165771678:web:b83297a625845ec1f3188f",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth