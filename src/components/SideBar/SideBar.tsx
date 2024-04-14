import { BookHeart, CircleUserRound, Search } from 'lucide-react'

import {
	toggleFavorites,
	toggleProfile,
	toggleSearch,
} from '@/store/slices/dashboardSlice'
import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import MainButton from '../UI/MainButton/MainButton'
import styles from './SideBar.module.scss'

const SideBar = () => {
	const photoURL = localStorage.getItem('photoURL')

	const dispatch = useDispatch()

	const handleToggleProfile = useCallback(() => {
		dispatch(toggleProfile())
	}, [dispatch])

	const handleToggleFavorites = useCallback(() => {
		dispatch(toggleFavorites())
	}, [dispatch])

	const handleToggleSearch = useCallback(() => {
		dispatch(toggleSearch())
	}, [dispatch])

	return (
		<aside className={styles.SideBar}>
			<div className={styles.logo}>
				<img src='/logo.svg' alt='logo'></img>
			</div>

			<div className={styles.wrapper}>
				<MainButton onClick={handleToggleSearch} svg={<Search />} />
				<MainButton onClick={handleToggleFavorites} svg={<BookHeart />} />
			</div>

			<div className={styles.avatar} onClick={handleToggleProfile}>
				{photoURL === '' ? (
					<div className={styles.avatar}>
						<CircleUserRound />
					</div>
				) : (
					<img
						src={photoURL ?? ''}
						alt='avatar'
						className={styles.avatar}
					></img>
				)}
			</div>
		</aside>
	)
}

export default SideBar
