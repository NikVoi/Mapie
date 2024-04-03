import { useEffect, useState } from 'react'

interface MapFeatures {
	circle: google.maps.Circle | null
	userMarker: google.maps.Marker | null
	map: google.maps.Map | null
	handleMapLoad: (map: google.maps.Map) => void
}

const useMapFeatures = (
	isLoaded: boolean,
	userPosition: google.maps.LatLng | null,
	radius: number,
	places: any[],
	userMarkerUrl: string
): MapFeatures => {
	const [circle, setCircle] = useState<google.maps.Circle | null>(null)
	const [userMarker, setUserMarker] = useState<google.maps.Marker | null>(null)
	const [map, setMap] = useState<google.maps.Map | null>(null)

	useEffect(() => {
		if (isLoaded && userPosition) {
			if (circle) {
				circle.setCenter(userPosition)
				circle.setRadius(radius)
			} else {
				const newCircle = new google.maps.Circle({
					center: userPosition,
					radius: radius,
					strokeColor: '#5E7BC7',
					strokeOpacity: 1,
					strokeWeight: 2,
					fillColor: '#5E7BC7',
					fillOpacity: 0.3,
					map: map,
				})
				setCircle(newCircle)
			}

			if (userMarker) {
				userMarker.setPosition(userPosition)
			} else {
				const newUserMarker = new google.maps.Marker({
					position: userPosition,
					map: map,
					icon: {
						url: userMarkerUrl,
						size: new google.maps.Size(30, 30),
					},
				})
				setUserMarker(newUserMarker)
			}
		}
	}, [isLoaded, userPosition, radius, map, circle, userMarker, userMarkerUrl])

	const handleMapLoad = (map: google.maps.Map) => {
		setMap(map)
	}

	return { circle, userMarker, map, handleMapLoad }
}

export default useMapFeatures
