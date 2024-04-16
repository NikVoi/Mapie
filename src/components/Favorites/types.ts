import { IPlace } from '@/types/Types'

export interface IItemProps {
	placeDetails: IPlace
	onRemove: (placeDetailsToRemove: IPlace) => void
}
