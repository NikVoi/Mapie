import axios from 'axios'

export const fetchPlaceDetails = async (placeId: string, apiKey: string) => {
	try {
		const response = await axios.get(`http://localhost:3000/place-details`, {
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
