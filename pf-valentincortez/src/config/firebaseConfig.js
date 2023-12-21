
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDT4aDXwaTRDlaISAC0MOg3be8BItp_XMQ",
  authDomain: "base-de-datos-react-pf.firebaseapp.com",
  projectId: "base-de-datos-react-pf",
  storageBucket: "base-de-datos-react-pf.appspot.com",
  messagingSenderId: "1042630806000",
  appId: "1:1042630806000:web:996ce6b545ee9bdc9e7535"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
