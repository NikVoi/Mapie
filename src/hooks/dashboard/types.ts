import { IPlace, IPosition } from '@/Types/Types'

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

export interface PlacesData {
	places: IPlace[]
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
