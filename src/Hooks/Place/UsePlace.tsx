import { saveDataToFirebase } from '@/API/FirebaseActions'
import {
	addPlace,
	removePlace,
	selectFavorites,
} from '@/Store/Slices/FavoritesSlice'
import { IPlace } from '@/Types/Types'
import { useDispatch, useSelector } from 'react-redux'

const usePlace = (placeDetails: IPlace | null) => {
	const favorites = useSelector(selectFavorites)
	const dispatch = useDispatch()

	const isPlaceInFavorites: boolean =
		placeDetails && placeDetails.id
			? favorites.some(favorite => favorite.id === placeDetails.id)
			: false

	const toggleFavorite = async () => {
		if (placeDetails) {
			const isInFavorites = favorites.some(
				favorite => favorite.id === placeDetails.id
			)

			if (!isInFavorites) {
				dispatch(addPlace(placeDetails))
				saveDataToFirebase(placeDetails)
			} else {
				dispatch(removePlace(placeDetails.id))
			}
		}
	}

	return { toggleFavorite, isPlaceInFavorites }
}

export default usePlace
