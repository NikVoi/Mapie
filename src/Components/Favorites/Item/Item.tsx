import { useCallback } from 'react'
import { FaBookmark } from 'react-icons/fa6'
import { MdPlayArrow } from 'react-icons/md'
import { useDispatch } from 'react-redux'

import { setFavoritesOpen, setPlaceOpen } from '@/Store/Slices/DashboardSlice'
import { setPlaceDetails } from '@/Store/Slices/Place/PlaceDetailsSlice'

import MainButton from '@/Components/UI/MainButton/MainButton'
import placeholder from '@Assets/img-placeholder.png'

import { removeDataFromFirebase } from '@/API/FirebaseActions'
import { IItemProps } from '../Types'
import styles from './Item.module.scss'

const Item = ({ placeDetails, onRemove }: IItemProps) => {
	const dispatch = useDispatch()

	const { displayName, editorialSummary, photos } = placeDetails || {}

	const handleOpenPlaceDetails = useCallback(() => {
		dispatch(setPlaceOpen(true))
		dispatch(setFavoritesOpen(false))
		dispatch(setPlaceDetails(placeDetails))
	}, [dispatch, placeDetails])

	const handleRemoveItem = () => {
		if (placeDetails.collectionID) {
			removeDataFromFirebase(placeDetails.collectionID)
				.then(() => {
					console.log('Item removed successfully!')
					if (onRemove) {
						onRemove(placeDetails)
					}
				})
				.catch(error => {
					console.error('Error removing item:', error)
				})
		} else {
			console.error('collectionID is undefined or null')
		}
	}

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
				<MainButton onClick={handleRemoveItem} svg={<FaBookmark />} />
				<MainButton onClick={handleOpenPlaceDetails} svg={<MdPlayArrow />} />
			</div>
		</div>
	)
}

export default Item
