import { IPlace } from "@/types/Types";
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from "firebase/firestore";

const {
  VITE_API_KEY,
  VITE_AUTO_DOMAINS,
  VITE_PROJECT_ID,
  VITE_STORAGE_BUCKET,
  VITE_MESSAGING_SENDER_ID,
  VITE_APP_ID,
  VITE_MEASUREMENT_ID,
} = import.meta.env;

const firebaseConfig = {
  apiKey: VITE_API_KEY,
  authDomain: VITE_AUTO_DOMAINS,
  projectId: VITE_PROJECT_ID,
  storageBucket: VITE_STORAGE_BUCKET,
  messagingSenderId: VITE_MESSAGING_SENDER_ID,
  appId: VITE_APP_ID,
  measurementId: VITE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const saveDataToFirebase = async (place: IPlace) => {
  try {
    await addDoc(collection(db, "favorites"), {
      id: place.id,
      name: place.name,
      displayName: {
        languageCode: place.displayName?.languageCode || null,
        text: place.displayName?.text || null,
      },
      editorialSummary: {
        languageCode: place.editorialSummary?.languageCode || null,
        text: place.editorialSummary?.text || null,
      },
      photos: place.photos || null,
      primaryType: place.primaryType || null,
      types: place.types || null,
      location: {
        latitude: place.location?.latitude || null,
        longitude: place.location?.longitude || null,
      },
      formattedAddress: place.formattedAddress || null,
    });
  } catch (error: any) {
    console.error("Error saving data:", error);
  }
};

const getAllFavorites = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "favorites"));
    const favorites = querySnapshot.docs.map((doc) => ({
      collectionID: doc.id,
      ...doc.data(),
    }));
    return favorites;
  } catch (error: any) {
    console.error("Error getting favorites:", error);
    return [];
  }
};

const removeDataFromFirebase = async (docId: string) => {
  try {
    await deleteDoc(doc(db, "favorites", docId));
    console.log("Document successfully deleted!");
  } catch (error: any) {
    console.error("Error removing document:", error);
  }
};

export {
  analytics,
  app,
  auth,
  getAllFavorites,
  googleProvider,
  removeDataFromFirebase,
  saveDataToFirebase,
};
