import { saveDataToFirebase } from '@/API/Firebase'
import {
	addPlace,
	removePlace,
	selectFavorites,
} from '@/Store/Slices/FavoritesSlice'
import { IPlace } from '@/Types/Types'
import { useDispatch, useSelector } from 'react-redux'

const usePlace = (placeDetails: IPlace | null) => {
	const dispatch = useDispatch()
	const favorites = useSelector(selectFavorites)

	const isPlaceInFavorites: boolean =
		placeDetails && placeDetails.id
			? favorites.some(favorite => favorite.id === placeDetails.id)
			: false

	const toggleFavorite = () => {
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
