import classNames from 'classnames'
import { ChevronLeft } from 'lucide-react'
import { FC } from 'react'
import { useSelector } from 'react-redux'

import { RootState } from '@/store/store'

import MainButton from '@components/UI/MainButton/MainButton'
import styles from './Place.module.scss'
import PlaceActions from './PlaceAction/PlaceAction'
import PlaceDetails from './PlaceDetails/PlaceDetails'
import PlacePhoto from './PlacePhoto/PlacePhoto'

import usePlace from '@/hooks/Place/usePlace'
import { selectPlaceDetails } from '@/store/slices/Place/placeDetailsSlice'
import { handleClose, handleToggleFavorites } from './placeHandlers'
import { IPlaceProps } from './types'

const Place: FC<IPlaceProps> = ({ onClick }) => {
	const selectedPlace = useSelector(selectPlaceDetails)

	const { isPlaceOpen } = useSelector((state: RootState) => state.dashboard)

	const { toggleFavorite, isPlaceInFavorites } = usePlace(selectedPlace)

	const handleRouteClick = () => {
		if (selectedPlace && selectedPlace.location) {
			const destination = {
				lat: selectedPlace.location.latitude,
				lng: selectedPlace.location.longitude,
			}

			onClick(destination)
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
					<PlacePhoto photoName={selectedPlace?.photos?.[0]?.name ?? null} />

					<div className={styles.categories}></div>

					<PlaceDetails
						name={selectedPlace?.displayName?.text ?? 'Нет информации'}
						description={
							selectedPlace?.editorialSummary?.text ?? 'Нет информации'
						}
						adress={selectedPlace?.formattedAddress || 'Нет информации'}
					/>

					<PlaceActions
						onToggleFavorite={toggleFavorite}
						onRouteClick={handleRouteClick}
						isFavorite={isPlaceInFavorites}
					/>
				</div>
			</div>

			<button className={styles.close} onClick={handleClose}>
				<ChevronLeft />
			</button>
		</section>
	)
}

export default Place
