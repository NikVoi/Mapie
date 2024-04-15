// Place details

export interface IPlace {
	id: string
	name: string
	displayName: {
		languageCode: string
		text: string
	}
	editorialSummary: {
		languageCode: string
		text: string
	}
	photos: IPhotos[]
	primaryType: string
	types: string[]
	location: ILocation
	formattedAddress: string
}

interface IPhotos {
	name: string
	widthPx: number
	heightPx: number
}

interface ILocation {
	latitude: number
	longitude: number
}

export interface IPosition {
	lat: number
	lng: number
}
