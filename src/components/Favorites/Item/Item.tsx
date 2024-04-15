import { useCallback } from 'react'
import { FaBookmark } from 'react-icons/fa6'
import { MdPlayArrow } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'

import { setPlaceDetails } from '@/store/slices/Place/placeDetailsSlice'
import { setFavoritesOpen, setPlaceOpen } from '@/store/slices/dashboardSlice'
import {
	addPlace,
	removePlace,
	selectFavorites,
} from '@/store/slices/favoritesSlice'

import MainButton from '@/components/UI/MainButton/MainButton'
import placeholder from '@assets/img-placeholder.png'

import { IItemProps } from '../types'
import styles from './Item.module.scss'

const Item = ({ placeDetails }: IItemProps) => {
	const dispatch = useDispatch()

	const favorites = useSelector(selectFavorites)

	const { displayName, editorialSummary, photos, id } = placeDetails || {}

	const isFavorite = id && favorites.some(favorite => favorite.id === id)

	const handleOpenPlaceDetails = useCallback(() => {
		dispatch(setPlaceOpen(true))
		dispatch(setFavoritesOpen(false))
		setPlaceDetails(placeDetails)
	}, [dispatch, placeDetails])

	const toggleFavorite = useCallback(() => {
		if (!isFavorite) {
			dispatch(addPlace(placeDetails))
		} else {
			dispatch(removePlace(placeDetails.id))
		}
	}, [dispatch, placeDetails, isFavorite])

	const imageUrl =
		photos && photos.length > 0
			? `https://places.googleapis.com/v1/${photos[0].name}/media?maxHeightPx=400&maxWidthPx=400&key=AIzaSyAmbnbX7QWlEA41SlYMxemJCSzx7MA_7-I`
			: placeholder

	return (
		<div className={styles.item}>
			<div className={styles.wrapper}>
				<div className={styles.img}>
					<img src={imageUrl} alt='pic' />
				</div>

				<div className={styles.name}>
					{displayName?.text || 'Нет информации'}
				</div>
			</div>

			<div className={styles.description}>
				{editorialSummary?.text || 'Описание отсутствует'}
			</div>

			<div className={styles.buttons}>
				<MainButton onClick={toggleFavorite} svg={<FaBookmark />} />
				<MainButton onClick={handleOpenPlaceDetails} svg={<MdPlayArrow />} />
			</div>
		</div>
	)
}

export default Item
