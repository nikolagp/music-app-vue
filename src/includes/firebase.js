import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZKPGu1O0QCjT-9O4MdqsEjxr-LLcOd5A",
  authDomain: "music-app-2402.firebaseapp.com",
  projectId: "music-app-2402",
  storageBucket: "music-app-2402.appspot.com",
  messagingSenderId: "207008642730",
  appId: "1:207008642730:web:561bf82e6d7fba622902d3",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

db.enablePersistence().catch((error) => {
  console.log(`Firebase persistance error ${error}`);
});

const usersCollection = db.collection("users");
const songsCollection = db.collection("songs");
const commentsCollection = db.collection("comments");

export {
  auth,
  db,
  usersCollection,
  songsCollection,
  storage,
  commentsCollection,
};
