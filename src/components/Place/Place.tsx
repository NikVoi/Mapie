import MainButton from '@/components/UI/MainButton/MainButton'
import { setPlaceOpen, toggleFavorites } from '@/store/slices/dashboardSlice'
import {
	addPlace,
	removePlace,
	selectFavorites,
} from '@/store/slices/favoritesSlice'
import { RootState } from '@/store/store'
import classNames from 'classnames'
import { ChevronLeft, MapPin } from 'lucide-react'
import { MdOutlineFavorite } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Place.module.scss'

import placeholder from '@assets/img-placeholder.png'

interface Props {
	placeDetails: any
}

const Place = ({ placeDetails }: Props) => {
	const dispatch = useDispatch()

	const { isPlaceOpen } = useSelector((state: RootState) => state.dashboard)

	const handleToggleFavorites = () => {
		dispatch(toggleFavorites())
	}

	const handleClose = () => {
		dispatch(setPlaceOpen(false))
	}

	const click = () => {}

	const favorites = useSelector(selectFavorites)

	const isFavorite =
		placeDetails &&
		placeDetails.id &&
		favorites.some(favorite => favorite.id === placeDetails.id)

	const toggleFavorite = () => {
		const isInFavorites = favorites.some(
			favorite => favorite.id === placeDetails.id
		)

		if (!isInFavorites) {
			dispatch(addPlace(placeDetails))
		} else {
			dispatch(removePlace(placeDetails.id))
		}
	}

	return (
		<section
			className={classNames(styles.place, {
				[styles.open]: isPlaceOpen,
			})}
		>
			<div className={styles.wrapper}>
				<div className={styles.title}>
					<MainButton svg={<ChevronLeft />} onClick={handleToggleFavorites} />
					<span>Избранное:</span>
				</div>

				<div className={styles.main}>
					<div className={styles.img}>
						{placeDetails &&
						placeDetails.photos &&
						placeDetails.photos.length > 0 ? (
							<img
								src={`https://places.googleapis.com/v1/${placeDetails.photos[0].name}/media?maxHeightPx=400&maxWidthPx=400&key=AIzaSyAmbnbX7QWlEA41SlYMxemJCSzx7MA_7-I`}
								alt='pic'
							/>
						) : (
							<img src={placeholder} alt='pic' />
						)}
					</div>

					<div className={styles.categories}></div>

					<div className={styles.name}>
						{placeDetails &&
						placeDetails.displayName &&
						placeDetails.displayName.text
							? placeDetails.displayName.text
							: 'Нет информации'}
					</div>

					<div className={styles.description}>
						{placeDetails &&
						placeDetails.editorialSummary &&
						placeDetails.editorialSummary.text
							? placeDetails.editorialSummary.text
							: 'Нет информации'}
					</div>

					<div
						className={classNames(styles.actions, {
							[styles.active]: isFavorite,
						})}
					>
						<MainButton
							text='Сохранить'
							onClick={toggleFavorite}
							svg={<MdOutlineFavorite />}
						/>
						<MainButton text='Маршрут' onClick={click} svg={<MapPin />} />
					</div>
				</div>
			</div>

			<button className={styles.close} onClick={handleClose}>
				<ChevronLeft />
			</button>
		</section>
	)
}

export default Place
