import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyCcQEoQ3dLS11rFMYpQnL-V35BLxEVIVdk",
    authDomain: "my-restaurant-chef-platform.firebaseapp.com",
    projectId: "my-restaurant-chef-platform",
    storageBucket: "my-restaurant-chef-platform.appspot.com",
    messagingSenderId: "1020361748311",
    appId: "1:1020361748311:web:d89716d56170ef495f9812",
    measurementId: "G-CCJEDNJXM5"
};

firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export const storage = firebase.storage();

export default firebase;
