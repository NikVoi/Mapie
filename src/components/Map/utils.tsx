import { Dispatch, SetStateAction } from 'react'

export const getUserPosition = (
	setUserPosition: Dispatch<SetStateAction<{ lat: number; lng: number } | null>>
) => {
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
