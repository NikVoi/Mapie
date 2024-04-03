import { useEffect, useState } from 'react'

export const useUserPosition = () => {
	const [userPosition, setUserPosition] = useState<{
		lat: number
		lng: number
	} | null>(null)

	const getUserPosition = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					setUserPosition({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					})
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
