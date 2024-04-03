import { RootState } from '@/store/store'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

interface Place {
	geometry: {
		location: {
			lat: number
			lng: number
		}
	}
}

interface Coordinates {
	lat: number
	lng: number
}

export const usePlaces = () => {
	const [places, setPlaces] = useState<Place[]>([])

	const radius = useSelector(
		(state: RootState) => state.radiusSlice.radiusSlice
	)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('http://localhost:3000/places', {
					params: {
						location: '53.90754,30.308218',
						radius: radius,
						key: 'AIzaSyAmbnbX7QWlEA41SlYMxemJCSzx7MA_7-I',
					},
				})

				const filteredPlaces = response.data.results.filter((place: Place) =>
					isPlaceInsideCircle(place, { lat: 53.90754, lng: 30.308218 }, radius)
				)

				setPlaces(filteredPlaces)
			} catch (error) {
				console.error('Error fetching places:', error)
			}
		}

		fetchData()
	}, [radius])

	return places
}

const isPlaceInsideCircle = (
	place: Place,
	center: Coordinates,
	radius: number
): boolean => {
	const placeLatLng = new window.google.maps.LatLng(
		place.geometry.location.lat,
		place.geometry.location.lng
	)
	const centerLatLng = new window.google.maps.LatLng(center.lat, center.lng)
	const distanceInMeters =
		window.google.maps.geometry.spherical.computeDistanceBetween(
			placeLatLng,
			centerLatLng
		)
	return distanceInMeters <= radius
}
