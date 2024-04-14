import { IPosition } from '@/types/types'

export interface IUserPositionProps {
	setMapCenter: React.Dispatch<React.SetStateAction<IPosition>>
}

export interface IPlacesLNG {
	geometry: {
		location: {
			lat: number
			lng: number
		}
	}
}

export interface ILocation {
	place_id: string
	geometry: {
		location: IPosition
	}
	name: string
	types: string[]
}
