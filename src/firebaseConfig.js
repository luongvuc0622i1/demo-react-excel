import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
// Initialize Firebase
const app = initializeApp ({
    apiKey: "AIzaSyD9YDPjIpgFru-7tYpPZxbmOHKZyGumiGY",
    authDomain: "excel-data-d68ae.firebaseapp.com",
    projectId: "excel-data-d68ae",
    storageBucket: "excel-data-d68ae.appspot.com",
    messagingSenderId: "153016528086",
    appId: "1:153016528086:web:82c5a424d274665f6ded77",
    // measurementId: "gs://excel-data-d68ae.appspot.com",
});
 
// Firebase storage reference
const storage = getStorage(app);
export default storage;