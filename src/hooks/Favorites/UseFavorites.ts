import { getAllFavorites } from '@/API/FirebaseActions'
import { IPlace } from '@/Types/Types'
import { useEffect, useState } from 'react'

export const useFavorites = () => {
	const [favorites, setFavorites] = useState<IPlace[]>([])

	useEffect(() => {
		const fetchFavorites = async () => {
			try {
				const favoritesData = await getAllFavorites()
				if (
					Array.isArray(favoritesData) &&
					favoritesData.length > 0 &&
					'id' in favoritesData[0]
				) {
					setFavorites(favoritesData as IPlace[])
				} else {
					console.error('Invalid data format for favorites:', favoritesData)
				}
			} catch (error) {
				console.error('Error fetching favorites:', error)
			}
		}

		fetchFavorites()
	}, [])

	const handleRemoveFavorite = (placeDetailsToRemove: IPlace) => {
		const updatedFavorites = favorites.filter(
			favorite => favorite !== placeDetailsToRemove
		)
		setFavorites(updatedFavorites)
	}

	return {
		favorites,
		handleRemoveFavorite,
	}
}
