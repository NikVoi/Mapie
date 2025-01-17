import { Autocomplete } from '@react-google-maps/api'
import classNames from 'classnames'
import { ChevronLeft } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

import { toggleFavorites } from '@/Store/Slices/DashboardSlice'
import { RootState } from '@/Store/Store'

import useAutocomplete from '@/Hooks/Dashboard/Search/useAutocomplete'
import usePlaceSelection from '@/Hooks/Dashboard/Search/usePlaceSelection'
import { useFavorites } from '@/Hooks/Favorites/UseFavorites'
import { selectFavorites } from '@/Store/Slices/FavoritesSlice'
import Input from '../UI/Input/Input'
import styles from './Favorites.module.scss'
import Item from './Item/Item'

const Favorites = () => {
	const dispatch = useDispatch()
	const favorites = useSelector(selectFavorites)

	const { isFavoritesOpen } = useSelector((state: RootState) => state.dashboard)

	const handleToggleFavorites = () => {
		dispatch(toggleFavorites())
	}

	const { autocomplete, onLoad } = useAutocomplete()
	const { handlePlaceSelect } = usePlaceSelection(autocomplete)

	const { handleRemoveFavorite } = useFavorites()

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
							<Item
								key={index}
								placeDetails={favorite}
								onRemove={() => handleRemoveFavorite(favorite)}
							/>
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
