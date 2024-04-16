import { IPosition } from '@/types/Types'
import { useEffect, useState } from 'react'
import { IUserPositionProps } from './types'

export const useUserPosition = ({ setMapCenter }: IUserPositionProps) => {
	const [userPosition, setUserPosition] = useState<IPosition | null>(null)

	const getUserPosition = () => {
		navigator.geolocation.getCurrentPosition(
			position => {
				const { latitude, longitude } = position.coords
				const newPosition: IPosition = { lat: latitude, lng: longitude }

				setUserPosition(newPosition)
				setMapCenter(newPosition)
			},
			error => {
				console.error('Error getting user position:', error)
			}
		)
	}

	useEffect(() => {
		if (navigator.geolocation) {
			getUserPosition()
		} else {
			console.error('Geolocation is not supported by this browser.')
		}
	}, [])

	return { userPosition, getUserPosition }
}
