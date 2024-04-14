import { fetchPlaceDetails } from '@/hooks/dashboard/usePlaceDetails'
import { setPlaceDetails } from '@/store/slices/Place/placeDetailsSlice'
import { togglePlace } from '@/store/slices/dashboardSlice'
import { useJsApiLoader } from '@react-google-maps/api'
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
