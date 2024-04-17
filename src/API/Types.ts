import { IPlace, IPosition } from '@/Types/Types'

export interface IRequestParams {
	pos: IPosition
	radius: number
	apiKey: string
	types?: string
}

export interface IApiResponse {
	results: IPlace[]
}
