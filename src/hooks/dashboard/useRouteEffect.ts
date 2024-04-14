import {
	setDistance,
	setDuration,
	setRoute,
} from '@/store/slices/distanceSlice'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const useRouteEffect = (destination: any, userPosition: any) => {
	const dispatch = useDispatch()
	useEffect(() => {
		if (destination && userPosition) {
			const directionsService = new window.google.maps.DirectionsService()
			directionsService.route(
				{
					origin: userPosition,
					destination,
					travelMode: google.maps.TravelMode.DRIVING,
				},
				(result: any, status: any) => {
					if (status === 'OK' && result && result.routes && result.routes[0]) {
						const route = result.routes[0]
						if (route.legs && route.legs[0]) {
							const distanceText = route.legs[0].distance?.text ?? null
							const durationText = route.legs[0].duration?.text ?? null
							dispatch(setDistance(distanceText))
							dispatch(setDuration(durationText))
							dispatch(setRoute(route))
						} else {
							console.error('Route legs are undefined')
						}
					} else {
						console.error('Directions request failed due to ' + status)
					}
				}
			)
		}
	}, [destination, userPosition])
}
