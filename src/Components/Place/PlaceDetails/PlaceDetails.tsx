import { FC } from 'react'

import styles from '../Place.module.scss'
import { IPlaceDetailsProps } from '../types'

const PlaceDetails: FC<IPlaceDetailsProps> = ({
	name,
	description,
	adress,
}) => (
	<div className={styles.details}>
		<div className={styles.categories}></div>
		<div className={styles.name}>{name}</div>
		<div className={styles.description}>{description}</div>
		<div className={styles.adress}>{adress}</div>
	</div>
)

export default PlaceDetails
