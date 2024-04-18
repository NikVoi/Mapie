import { getAllFavorites } from '@/API/FirebaseActions'
import {
	addPlace,
	clearPlaces,
	removePlace,
	selectFavorites,
} from '@/Store/Slices/FavoritesSlice'
import { IPlace } from '@/Types/Types'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export const useFavorites = () => {
	const dispatch = useDispatch()
	const favorites = useSelector(selectFavorites)

	useEffect(() => {
		const fetchFavorites = async () => {
			try {
				const favoritesData = await getAllFavorites()

				if (Array.isArray(favoritesData) && favoritesData.length > 0) {
					dispatch(clearPlaces())

					favoritesData.forEach((place: any) => {
						dispatch(addPlace(place))
					})
				} else {
					console.error('Invalid data format for favorites:', favoritesData)
				}
			} catch (error) {
				console.error('Error fetching favorites:', error)
			}
		}

		fetchFavorites()
	}, [favorites])

	const handleRemoveFavorite = (place: IPlace) => {
		dispatch(removePlace(place.id))
	}

	return {
		handleRemoveFavorite,
	}
}
