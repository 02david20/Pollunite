import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyB0pBpgnJx41G_ILRHXpld14N-Hhj5D-Rs",
  authDomain: "pollunite.firebaseapp.com",
  projectId: "pollunite",
  storageBucket: "pollunite.appspot.com",
  messagingSenderId: "265848015291",
  appId: "1:265848015291:web:63bfbbb1665c4464e79c9e"
};

const app = initializeApp(firebaseConfig);

export default app;