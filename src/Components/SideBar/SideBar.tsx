import { CircleUserRound, Search } from 'lucide-react'
import { useCallback } from 'react'
import { FaBookmark } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'

import {
	toggleFavorites,
	toggleProfile,
	toggleSearch,
} from '@/Store/Slices/DashboardSlice'

import { RootState } from '@/Store/Store'
import SideButton from '../UI/SideButton/SideButton'
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

	const isFavoritesOpen = useSelector(
		(state: RootState) => state.dashboard.isFavoritesOpen
	)
	const isSearchOpen = useSelector(
		(state: RootState) => state.dashboard.isSearchOpen
	)

	return (
		<aside className={styles.SideBar}>
			<div className={styles.logo}>
				<img src='/logo.svg' alt='logo'></img>
			</div>

			<div className={styles.wrapper}>
				<SideButton
					onClick={handleToggleSearch}
					svg={<Search />}
					isActive={isSearchOpen}
				/>
				<SideButton
					onClick={handleToggleFavorites}
					svg={<FaBookmark />}
					isActive={isFavoritesOpen}
				/>
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
