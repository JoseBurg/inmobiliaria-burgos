// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Tu configuración web de Firebase para esta aplicación
const firebaseConfig = {
  apiKey: "AIzaSyBQGh6HGKLr51JSu6PMLRhg-1_tzhxRM2U",
  authDomain: "inmobiliaria-4b5bc.firebaseapp.com",
  projectId: "inmobiliaria-4b5bc",
  storageBucket: "inmobiliaria-4b5bc.firebasestorage.app",
  messagingSenderId: "801864925213",
  appId: "1:801864925213:web:9eca8ec1f2430a347b86f4"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Exporta la instancia de la base de datos de Firestore
export const db = getFirestore(app);
export const storage = getStorage(app);