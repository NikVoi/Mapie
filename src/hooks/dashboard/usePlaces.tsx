import { fetchPlaces } from '@/API/PlacesAPI'
import { RootState } from '@/store/store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const { VITE_GOOGLE_KEY } = import.meta.env

interface Place {
	geometry: {
		location: {
			lat: number
			lng: number
		}
	}
}

interface Props {
	userPosition: {
		lat: number
		lng: number
	}
}

export const usePlaces = ({ userPosition }: Props) => {
	const [places, setPlaces] = useState<Place[]>([])
	const radius = useSelector(
		(state: RootState) => state.radiusSlice.radiusSlice
	)
	const types = useSelector((state: RootState) => state.radiusSlice.types)

	useEffect(() => {
		const fetchData = async () => {
			if (userPosition) {
				try {
					const apiKey = import.meta.env.VITE_GOOGLE_KEY
					const placesData = await fetchPlaces({
						userPosition,
						radius,
						apiKey,
						types,
					})
					console.log(placesData)
					const filteredPlaces = placesData.filter((place: Place) =>
						isPlaceInsideCircle(
							place,
							userPosition.lat,
							userPosition.lng,
							radius
						)
					)
					setPlaces(filteredPlaces)
				} catch (error) {
					console.error('Error fetching places:', error)
				}
			}
		}

		fetchData()
	}, [radius, types])

	return places
}

const isPlaceInsideCircle = (
	place: Place,
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
