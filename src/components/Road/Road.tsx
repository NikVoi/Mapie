import {
	clearRoute,
	setClearRoute,
	setDistance,
	setDuration,
	setIsWindowOpen,
} from '@/store/slices/distanceSlice'
import { RootState } from '@/store/store'
import { IoClose } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import MainButton from '../UI/MainButton/MainButton'
import styles from './Road.module.scss'

const Road = () => {
	const dispatch = useDispatch()

	const distance = useSelector((state: RootState) => state.distance.distance)
	const duration = useSelector((state: RootState) => state.distance.duration)

	if (!distance || !duration) {
		return null
	}

	const clearRouteAndData = () => {
		dispatch(clearRoute())
		dispatch(setClearRoute(true))
		dispatch(setDistance(null))
		dispatch(setDuration(null))
		dispatch(setIsWindowOpen(false))
	}

	return (
		<section className={styles.road}>
			<MainButton svg={<IoClose />} onClick={clearRouteAndData} />

			<div className={styles.line} />

			<div className={styles.wrapper}>
				<div className={styles.item}>
					<span>{distance}</span>
					<span>Дистанция</span>
				</div>
				<div className={styles.item}>
					<span>{duration}</span>
					<span>Примерное время</span>
				</div>
			</div>
		</section>
	)
}

export default Road
