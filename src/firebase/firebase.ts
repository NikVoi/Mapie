import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'

console.log(import.meta.env.VITE_AUTO_DOMAINS)

const {
	VITE_API_KEY,
	VITE_AUTO_DOMAINS,
	VITE_PROJECT_ID,
	VITE_STORAGE_BUCKET,
	VITE_MESSAGING_SENDER_ID,
	VITE_APP_ID,
	VITE_MEASUREMENT_ID,
} = import.meta.env

const firebaseConfig = {
	apiKey: VITE_API_KEY,
	authDomain: VITE_AUTO_DOMAINS,
	projectId: VITE_PROJECT_ID,
	storageBucket: VITE_STORAGE_BUCKET,
	messagingSenderId: VITE_MESSAGING_SENDER_ID,
	appId: VITE_APP_ID,
	measurementId: VITE_MEASUREMENT_ID,
}

const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

export { analytics, app, auth, googleProvider }
