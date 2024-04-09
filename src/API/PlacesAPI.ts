import axios, { AxiosResponse } from 'axios'

interface UserPosition {
	lat: number
	lng: number
}

export const fetchPlaces = async ({
	userPosition,
	radius,
	apiKey,
	types,
}: {
	userPosition: UserPosition
	radius: number
	apiKey: string
	types?: string
}) => {
	try {
		const response: AxiosResponse<any> = await axios.get(
			'http://localhost:3000/places',
			{
				params: {
					location: `${userPosition.lat},${userPosition.lng}`,
					radius: radius,
					key: apiKey,
					types: types,
				},
			}
		)

		return response.data.results
	} catch (error) {
		console.error('Error fetching places:', error)
		throw new Error('Error fetching places')
	}
}
