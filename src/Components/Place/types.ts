import { IPlace } from '@/Types/Types'

export interface IPlaceActionsProps {
	onToggleFavorite: () => void
	onRouteClick: () => void
	isFavorite: boolean
}

export interface IPlaceDetailsProps {
	name: string
	description: string
	adress: string
}

export interface IPlacePhotoProps {
	photoName?: string | null
}

export interface IPlaceProps {
	onClick: (destination: { lat: number; lng: number }) => void
}

export interface IFavorite {
	favorites: IPlace[]
}
