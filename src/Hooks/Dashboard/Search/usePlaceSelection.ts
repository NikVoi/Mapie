import { selectPlace } from '@/Store/Slices/PlaceSlice'
import { useDispatch } from 'react-redux'

interface Autocomplete {
	getPlace(): google.maps.places.PlaceResult | null
}

const usePlaceSelection = (autocomplete: Autocomplete | null) => {
	const dispatch = useDispatch()

	const handlePlaceSelect = () => {
		if (autocomplete !== null) {
			const place = autocomplete.getPlace()
			dispatch(selectPlace(place))
		}
	}

	return { handlePlaceSelect }
}

export default usePlaceSelection
