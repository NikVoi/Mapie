import axios from 'axios'

const { VITE_PLACE_DETAILS } = import.meta.env

export const fetchPlaceDetails = async (placeId: string, apiKey: string) => {
	try {
		const response = await axios.get(`${VITE_PLACE_DETAILS}`, {
			params: {
				placeId,
				key: apiKey,
			},
		})

		const data = response.data

		return data
	} catch (error) {
		console.error('Error fetching place details:', error)
		return null
	}
}
