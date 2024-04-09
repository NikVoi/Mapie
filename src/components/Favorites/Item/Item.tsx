import MainButton from '@/components/UI/MainButton/MainButton'
import { setFavoritesOpen, setPlaceOpen } from '@/store/slices/dashboardSlice'
import {
	addPlace,
	removePlace,
	selectFavorites,
} from '@/store/slices/favoritesSlice'
import { ChevronRight } from 'lucide-react'
import { MdOutlineFavorite } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Item.module.scss'

interface Photos {
	name: string
	widthPx: number
	heightPx: number
}

interface PlaceDetails {
	id: string
	displayName: {
		languageCode: string
		text: string
	}
	editorialSummary: {
		languageCode: string
		text: string
	}
	photos: Photos[]
	primaryType: string
	types: string[]
	location: {
		latitude: number
		longitude: number
	}
}

interface Props {
	placeDetails: PlaceDetails
	setPlaceDetails: (newValue: any) => void
}

const Item = ({ placeDetails, setPlaceDetails }: Props) => {
	const dispatch = useDispatch()
	const favorites = useSelector(selectFavorites)

	const handleOpenPlaceDetails = () => {
		dispatch(setPlaceOpen(true))
		dispatch(setFavoritesOpen(false))
		setPlaceDetails(placeDetails)
	}

	const isFavorite =
		placeDetails &&
		placeDetails.id &&
		favorites.some(favorite => favorite.id === placeDetails.id)

	const toggleFavorite = () => {
		if (!isFavorite) {
			dispatch(addPlace(placeDetails))
		} else {
			dispatch(removePlace(placeDetails.id))
		}
	}

	return (
		<div className={styles.item}>
			<div className={styles.wrapper}>
				<div className={styles.img}>
					{placeDetails &&
					placeDetails.photos &&
					placeDetails.photos.length > 0 ? (
						<img
							src={`https://places.googleapis.com/v1/${placeDetails.photos[0].name}/media?maxHeightPx=400&maxWidthPx=400&key=AIzaSyAmbnbX7QWlEA41SlYMxemJCSzx7MA_7-I`}
							alt='pic'
						/>
					) : (
						<div>Изображение недоступно</div>
					)}
				</div>

				<div className={styles.name}>{placeDetails.displayName.text}</div>
			</div>

			<div className={styles.description}>
				{placeDetails.editorialSummary && placeDetails.editorialSummary.text
					? placeDetails.editorialSummary.text
					: 'Описание отсутствует'}
			</div>

			<div className={styles.buttons}>
				<MainButton onClick={toggleFavorite} svg={<MdOutlineFavorite />} />

				<MainButton onClick={handleOpenPlaceDetails} svg={<ChevronRight />} />
			</div>
		</div>
	)
}

export default Item
