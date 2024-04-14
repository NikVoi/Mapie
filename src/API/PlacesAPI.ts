import { IPosition } from '@/types/types'
import axios, { AxiosResponse } from 'axios'

interface IFetch {
	pos: IPosition
	radius: number
	apiKey: string
	types?: string
}

export const fetchPlaces = async ({
	pos,
	radius,
	apiKey,
	types,
}: IFetch): Promise<any> => {
	try {
		const response: AxiosResponse<any> = await axios.get(
			'http://localhost:3000/places',
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
