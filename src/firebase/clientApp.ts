
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, onIdTokenChanged } from "firebase/auth";

const firebaseConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

// Function to set a cookie
const setCookie = (name: string, value: string, days: number) => {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

// Function to erase a cookie
const eraseCookie = (name: string) => {
  document.cookie = name+'=; Max-Age=-99999999;';
}

// Listen for token changes and update the cookie
onIdTokenChanged(auth, async (user) => {
  if (user) {
    const token = await user.getIdToken();
    setCookie('token', token, 1); // Set cookie for 1 day
  } else {
    eraseCookie('token');
  }
});

export { app, auth };
