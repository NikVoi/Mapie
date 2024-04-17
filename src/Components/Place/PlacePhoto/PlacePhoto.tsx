import { FC } from 'react'

import placeholder from '@Assets/img-placeholder.png'

import styles from '../Place.module.scss'
import { IPlacePhotoProps } from '../types'

const PlacePhoto: FC<IPlacePhotoProps> = ({ photoName }) => {
	const imageUrl = photoName
		? `https://places.googleapis.com/v1/${photoName}/media?maxHeightPx=400&maxWidthPx=400&key=AIzaSyAmbnbX7QWlEA41SlYMxemJCSzx7MA_7-I`
		: placeholder

	return (
		<div className={styles.img}>
			<img src={imageUrl} alt='pic' />
		</div>
	)
}

export default PlacePhoto
