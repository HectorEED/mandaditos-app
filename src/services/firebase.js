import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyB1k2se7NXSWr44DUVEdIKSXR9e2QbCVQE",
  authDomain: "mandaditos-app-af061.firebaseapp.com",
  projectId: "mandaditos-app-af061",
  storageBucket: "mandaditos-app-af061.firebasestorage.app",
  messagingSenderId: "572879817009",
  appId: "1:572879817009:web:06e7c67bfe5af6880a0810"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);