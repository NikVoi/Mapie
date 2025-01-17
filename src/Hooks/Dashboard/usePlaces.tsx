import { fetchPlaces } from '@/API/PlacesAPI'
import { RootState } from '@/Store/Store'
import { IPlace, IPosition } from '@/Types/Types'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { IPlacesLNG } from './Types'

const { VITE_GOOGLE_KEY } = import.meta.env

export const usePlaces = ({ lat, lng }: IPosition) => {
	const [places, setPlaces] = useState<IPlace[]>([])
	const radius = useSelector(
		(state: RootState) => state.radiusSlice.radiusSlice
	)
	const types = useSelector((state: RootState) => state.radiusSlice.types)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const apiKey = VITE_GOOGLE_KEY
				const placesData = await fetchPlaces({
					pos: { lat, lng },
					radius,
					apiKey,
					types,
				})

				const filteredPlaces = placesData.filter((place: any) =>
					isPlaceInsideCircle(place, lat, lng, radius)
				)

				setPlaces(filteredPlaces)
			} catch (error) {
				console.error('Error fetching places:', error)
			}
		}

		fetchData()
	}, [lat, lng, radius, types])

	return places
}

const isPlaceInsideCircle = (
	place: IPlacesLNG,
	lat: number,
	lng: number,
	radius: number
): boolean => {
	const placeLatLng = new window.google.maps.LatLng(
		place.geometry.location.lat,
		place.geometry.location.lng
	)
	const centerLatLng = new window.google.maps.LatLng(lat, lng)
	const distanceInMeters =
		window.google.maps.geometry.spherical.computeDistanceBetween(
			placeLatLng,
			centerLatLng
		)
	return distanceInMeters <= radius
}
