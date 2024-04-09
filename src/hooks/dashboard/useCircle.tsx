import { useEffect, useState } from 'react'

interface CircleOptions {
	center: google.maps.LatLng | google.maps.LatLngLiteral | undefined
	radius: number | undefined
}
const useCircle = (
	userPosition: { lat: number; lng: number } | null,
	radius: number | null
): CircleOptions => {
	const [circleOptions, setCircleOptions] = useState<CircleOptions>({
		center: undefined,
		radius: undefined,
	})

	useEffect(() => {
		if (userPosition && radius !== null) {
			setCircleOptions({
				center: { lat: userPosition.lat, lng: userPosition.lng },
				radius: radius !== 0 ? radius : undefined,
			})
		}
	}, [userPosition, radius])

	return circleOptions
}

export default useCircle
