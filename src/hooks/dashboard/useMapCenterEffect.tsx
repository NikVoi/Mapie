import { useEffect } from 'react'

export const useMapCenterEffect = (selectedPlace: any, setMapCenter: any) => {
	useEffect(() => {
		if (selectedPlace) {
			setMapCenter({
				lat: selectedPlace.location.lat,
				lng: selectedPlace.location.lng,
			})
		}
	}, [selectedPlace, setMapCenter])
}
