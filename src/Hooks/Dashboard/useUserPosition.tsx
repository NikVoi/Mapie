import { IPosition } from '@/Types/Types'
import { useEffect, useState } from 'react'
import { IUserPositionProps } from './Types'

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

	const setNewPosition = (newPosition: IPosition) => {
		setUserPosition(newPosition)
		setMapCenter(newPosition)
	}

	useEffect(() => {
		if (navigator.geolocation) {
			getUserPosition()
		} else {
			console.error('Geolocation is not supported by this browser.')
		}
	}, [])

	return { userPosition, getUserPosition, setNewPosition }
}
