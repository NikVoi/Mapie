import { useEffect, useState } from 'react'

export const useUserPosition = () => {
	const [userPosition, setUserPosition] = useState<google.maps.LatLng | null>(
		null
	)

	const getUserPosition = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					const { latitude, longitude } = position.coords
					const newPosition = new google.maps.LatLng(latitude, longitude)
					setUserPosition(newPosition)
				},
				error => {
					console.error('Error getting user position:', error)
				}
			)
		} else {
			console.error('Geolocation is not supported by this browser.')
		}
	}

	useEffect(() => {
		getUserPosition()
	}, [])

	return {
		userPosition,
		getUserPosition,
	}
}
