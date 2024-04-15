import classNames from 'classnames'
import { MapPin } from 'lucide-react'
import { FC } from 'react'
import { FaBookmark } from 'react-icons/fa6'

import MainButton from '@/components/UI/MainButton/MainButton'

import { IPlaceActionsProps } from '../types'

import styles from '../Place.module.scss'

const PlaceActions: FC<IPlaceActionsProps> = ({
	onToggleFavorite,
	onRouteClick,
	isFavorite,
}) => (
	<div className={classNames(styles.actions, { [styles.active]: isFavorite })}>
		<MainButton
			text='Сохранить'
			onClick={onToggleFavorite}
			svg={<FaBookmark />}
		/>
		<MainButton text='Маршрут' onClick={onRouteClick} svg={<MapPin />} />
	</div>
)
export default PlaceActions
