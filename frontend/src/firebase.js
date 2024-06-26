
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyADzLJ0mCIbfKSL81DTBbKogyv3_Grahkc",
  authDomain: "loginpage-ecf16.firebaseapp.com",
  projectId: "loginpage-ecf16",
  storageBucket: "loginpage-ecf16.appspot.com",
  messagingSenderId: "137901221655",
  appId: "1:137901221655:web:96aa81ac5bd5b71257f952",
  measurementId: "G-5ZW48N6D8Q"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
