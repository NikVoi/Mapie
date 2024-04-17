import { IPlace } from '@/Types/Types'
import axios, { AxiosResponse } from 'axios'
import { IApiResponse, IRequestParams } from './Types'
const { VITE_PLACES_API } = import.meta.env

export const fetchPlaces = async ({
	pos,
	radius,
	apiKey,
	types,
}: IRequestParams): Promise<IPlace[]> => {
	try {
		const response: AxiosResponse<IApiResponse> = await axios.get(
			`${VITE_PLACES_API}`,
			{
				params: {
					location: `${pos.lat},${pos.lng}`,
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
