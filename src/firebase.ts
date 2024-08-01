import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCieXj8EXOK_y5WpuFNVUtjum4H65zKsUI",
  authDomain: "inno-api-react-project.firebaseapp.com",
  projectId: "inno-api-react-project",
  storageBucket: "inno-api-react-project.appspot.com",
  messagingSenderId: "702805629738",
  appId: "1:702805629738:web:ba0ecbef58702aa5a8dc53",
  measurementId: "G-9JWKJHFKDM",
  databaseURL: 'https://inno-api-react-project-default-rtdb.europe-west1.firebasedatabase.app/'
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { database };
export default auth;