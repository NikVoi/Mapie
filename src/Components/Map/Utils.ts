import { fetchPlaceDetails } from '@/Hooks/Dashboard/usePlaceDetails'
import { togglePlace } from '@/Store/Slices/DashboardSlice'
import { setPlaceDetails } from '@/Store/Slices/Place/PlaceDetailsSlice'
import { useJsApiLoader } from '@react-google-maps/api'
import { MutableRefObject, RefObject, useCallback, useEffect } from 'react'
import { useDispatch } from 'react-redux'

const { VITE_GOOGLE_KEY } = import.meta.env

export const googleMapsLoader = (apiKey: string) => {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: apiKey,
	})

	return { isLoaded }
}

export const useHandleMarkerClick = () => {
	const dispatch = useDispatch()

	const handleMarkerClick = async (placeId: string) => {
		const details = await fetchPlaceDetails(placeId, VITE_GOOGLE_KEY)

		dispatch(setPlaceDetails(details))
		dispatch(togglePlace())
	}

	return handleMarkerClick
}

interface MapProps {
	circleRef: MutableRefObject<google.maps.Circle | null>
	mapRef: RefObject<google.maps.Map | null>
	position: { lat: number; lng: number } | null
	radius: number
}

export const useCircleRedraw = ({
	circleRef,
	mapRef,
	position,
	radius,
}: MapProps) => {
	const drawCircle = useCallback(
		async (position: { lat: number; lng: number } | null) => {
			const removeCircle = () => {
				if (circleRef.current && circleRef.current.setMap) {
					circleRef.current.setMap(null)
				}
			}

			if (position && mapRef.current) {
				removeCircle()
				const newCircle = new google.maps.Circle({
					center: position,
					radius: radius,
					strokeColor: '#5E7BC7',
					strokeOpacity: 1,
					strokeWeight: 2,
					fillColor: '#5E7BC7',
					fillOpacity: 0.3,
					map: mapRef.current,
				})
				circleRef.current = newCircle
			}
		},
		[circleRef, mapRef, radius]
	)

	useEffect(() => {
		drawCircle(position)
	}, [drawCircle, position])

	const redrawWithNewPosition = (newPosition: { lat: number; lng: number }) => {
		drawCircle(newPosition)
	}

	return { redrawWithNewPosition, drawCircle }
}
