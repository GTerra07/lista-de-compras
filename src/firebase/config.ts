import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQh85YvvjZx9VB1Nie_5LABZqiHc9grvU",
  authDomain: "lista-de-compras-bcae5.firebaseapp.com",
  projectId: "lista-de-compras-bcae5",
  storageBucket: "lista-de-compras-bcae5.firebasestorage.app",
  messagingSenderId: "726064267207",
  appId: "1:726064267207:web:158c64dee24b3196aea3e2"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 