import {
	setDistance,
	setDuration,
	setIsWindowOpen,
	setRoute,
} from '@/Store/Slices/DistanceSlice'
import { MutableRefObject, useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const useRouteEffect = (
	destination: any,
	userPosition: any,
	polylineRef: MutableRefObject<google.maps.Polyline | null>,
	mapRef: MutableRefObject<google.maps.Map | null>,
	setIsPolylineRendered: any,
	route: any
) => {
	const dispatch = useDispatch()

	useEffect(() => {
		if (polylineRef.current && polylineRef.current.setMap) {
			polylineRef.current.setMap(null)
			polylineRef.current = null
			setIsPolylineRendered(true)
		}

		if (route) {
			const newPolyline = new google.maps.Polyline({
				path: route.overview_path,
				strokeColor: '#FF0000',
				strokeOpacity: 1,
				strokeWeight: 2,
				map: mapRef.current,
			})
			polylineRef.current = newPolyline
		}
	}, [route])

	useEffect(() => {
		if (polylineRef.current && polylineRef.current.setMap) {
			polylineRef.current.setMap(null)
		}

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
							dispatch(
								setRoute({
									overview_path: route.overview_path,
								})
							)
							dispatch(setIsWindowOpen(true))
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
