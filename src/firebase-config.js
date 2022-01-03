import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "@firebase/auth";
import { API_KEY } from "./keys/key";
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "todoapp-985ab.firebaseapp.com",
  projectId: "todoapp-985ab",
  storageBucket: "todoapp-985ab.appspot.com",
  messagingSenderId: "158420436128",
  appId: "1:158420436128:web:9049e9264f9b24c6b035c5",
  measurementId: "G-V7TXEZ8XXF",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
