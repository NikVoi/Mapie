import { IPlace } from '@/Types/Types'

export interface IItemProps {
	placeDetails: IPlace
	onRemove: (placeDetailsToRemove: IPlace) => void
}
