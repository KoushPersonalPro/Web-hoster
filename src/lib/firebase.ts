import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAwtbwx_KWvH7jZgYgTIo5EUxWfESu0iiM",
  authDomain: "web-hoster-7a7f5.firebaseapp.com",
  projectId: "web-hoster-7a7f5",
  storageBucket: "web-hoster-7a7f5.firebasestorage.app",
  messagingSenderId: "306942710509",
  appId: "1:306942710509:web:f3bb9ce4e3dfbaeedbf2e4",
  measurementId: "G-NF2518QB31"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);