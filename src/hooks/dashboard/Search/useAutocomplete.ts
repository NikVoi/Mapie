import { useState } from 'react'

const useAutocomplete = () => {
	const [autocomplete, setAutocomplete] =
		useState<google.maps.places.Autocomplete | null>(null)

	const onLoad = (auto: google.maps.places.Autocomplete) => {
		console.log('Autocomplete loaded:', auto)
		setAutocomplete(auto)
	}

	return { autocomplete, onLoad }
}

export default useAutocomplete
