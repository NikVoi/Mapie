import { selectPlace } from '@/store/slices/placeSlice'
import { useDispatch } from 'react-redux'

interface Autocomplete {
	getPlace(): google.maps.places.PlaceResult | null
}

const usePlaceSelection = (autocomplete: Autocomplete | null) => {
	const dispatch = useDispatch()

	const handlePlaceSelect = () => {
		if (autocomplete !== null) {
			const place = autocomplete.getPlace()
			console.log('Выбранное место:', place)
			dispatch(selectPlace(place))
		}
	}

	return { handlePlaceSelect }
}

export default usePlaceSelection
