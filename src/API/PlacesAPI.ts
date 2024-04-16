import { IPosition } from '@/types/Types'
import axios, { AxiosResponse } from 'axios'
const { VITE_PLACES_API } = import.meta.env

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
		const response: AxiosResponse<any> = await axios.get(`${VITE_PLACES_API}`, {
			params: {
				location: `${pos.lat},${pos.lng}`,
				radius: radius,
				key: apiKey,
				types: types,
			},
		})

		return response.data.results
	} catch (error) {
		console.error('Error fetching places:', error)
		throw new Error('Error fetching places')
	}
}
