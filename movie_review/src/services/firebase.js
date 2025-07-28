import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKye-NfpXXoONAOkm2dYtaUVrz2974XF0",
  authDomain: "test-app12-9ead4.firebaseapp.com",
  projectId: "test-app12-9ead4",
  storageBucket: "test-app12-9ead4.firebasestorage.app",
  messagingSenderId: "915699492144",
  appId: "1:915699492144:web:b9b7f3c9d2bb774cdb54f5",
  measurementId: "G-S7J2BM9QCP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Initialize Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Initialize Analytics (optional - only in browser environment)
let analytics = null;
if (typeof window !== 'undefined') {
  try {
    analytics = getAnalytics(app);
  } catch (error) {
    console.log('Analytics not available:', error);
  }
}

// Google Sign In function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    return { error: null };
    
  } catch (error) {
    return { error: error.message };
  }
};

export const onAuthStateChange = (callback) => {
  return onAuthStateChanged(auth, callback);
}; 