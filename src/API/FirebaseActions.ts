import { IPlace } from '@/Types/Types'
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import { db } from './Firebase'

export const saveDataToFirebase = async (place: IPlace) => {
	try {
		await addDoc(collection(db, 'favorites'), {
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
		})
	} catch (error) {
		console.error('Error saving data:', error)
	}
}

export const getAllFavorites = async () => {
	try {
		const querySnapshot = await getDocs(collection(db, 'favorites'))
		const favorites = querySnapshot.docs.map(doc => ({
			collectionID: doc.id,
			...doc.data(),
		}))
		return favorites
	} catch (error) {
		console.error('Error getting favorites:', error)
		return []
	}
}

export const removeDataFromFirebase = async (docId: string) => {
	try {
		await deleteDoc(doc(db, 'favorites', docId))
		console.log('Document successfully deleted!')
	} catch (error) {
		console.error('Error removing document:', error)
	}
}
