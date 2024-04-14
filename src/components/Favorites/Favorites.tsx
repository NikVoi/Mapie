import classNames from 'classnames'
import { ChevronLeft } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

import { toggleFavorites } from '@/store/slices/dashboardSlice'
import { selectFavorites } from '@/store/slices/favoritesSlice'
import { RootState } from '@/store/store'

import useAutocomplete from '@/hooks/dashboard/Search/useAutocomplete'
import usePlaceSelection from '@/hooks/dashboard/Search/usePlaceSelection'
import { Autocomplete } from '@react-google-maps/api'
import Input from '../UI/Input/Input'
import styles from './Favorites.module.scss'
import Item from './Item/Item'

const Favorites = () => {
	const favorites = useSelector(selectFavorites)

	const dispatch = useDispatch()

	const { isFavoritesOpen } = useSelector((state: RootState) => state.dashboard)

	const handleToggleFavorites = () => {
		dispatch(toggleFavorites())
	}

	const { autocomplete, onLoad } = useAutocomplete()
	const { handlePlaceSelect } = usePlaceSelection(autocomplete)

	return (
		<section
			className={classNames(styles.favorites, {
				[styles.open]: isFavoritesOpen,
			})}
		>
			<div className={styles.main}>
				<div className={styles.search}>
					<Autocomplete onLoad={onLoad} onPlaceChanged={handlePlaceSelect}>
						<Input placeholder='Место, адрес..' />
					</Autocomplete>
				</div>

				<div className={styles.title}>
					<span>Избранное:</span>
				</div>

				<div className={styles.wrapper}>
					{favorites.length > 0 ? (
						favorites.map((favorite, index) => (
							<Item key={index} placeDetails={favorite} />
						))
					) : (
						<div className={styles.empty}>Избранных мест пока нет</div>
					)}
				</div>
			</div>

			<button className={styles.close} onClick={handleToggleFavorites}>
				<ChevronLeft />
			</button>
		</section>
	)
}

export default Favorites
