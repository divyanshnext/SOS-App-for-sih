import { initializeApp } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth'; // Correct import
import AsyncStorage from '@react-native-async-storage/async-storage';

// Firebase configuration object
const firebaseConfig = {
  apiKey: "AIzaSyAg2lxActEYwjw3MOuyCdCIq0E8JHJ0Tjs",
  authDomain: "sos-app-8ea89.firebaseapp.com",
  projectId: "sos-app-8ea89",
  storageBucket: "sos-app-8ea89.appspot.com",
  messagingSenderId: "492373597720",
  appId: "1:492373597720:web:3f7cb81c8de4a7abfc6d6d",
  measurementId: "G-EKF7DSVRQ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics


// Initialize Auth with persistence
const auth = getAuth(app); // Use getAuth instead of initializeAuth

// const auth = initializeAuth(app, {
//   persistence: getReactNativePersistence(AsyncStorage)
// });

export { auth };
