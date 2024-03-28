import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import styles from './Dashboard.module.scss'

import { RootState } from '@/store/store'
import { useState } from 'react'
import Favorites from '../Favoritse/Favorites'
import Map from '../Map/Map'
import Profile from '../Profile/Profile'
import Search from '../Search/Search'
import SideBar from '../SideBar/SideBar'

const Dashboard = () => {
	const [isProfileOpen, setIsProfileOpen] = useState(false)
	const [isFavoritesOpen, setIsFavoritesOpen] = useState(false)
	const [isSearchOpen, setIsSearchOpen] = useState(false)

	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	)

	const toggleProfile = () => {
		setIsProfileOpen(prevState => !prevState)
	}

	const toggleFavorites = () => {
		setIsFavoritesOpen(prevState => !prevState)
		setIsSearchOpen(false)
	}

	const toggleSearch = () => {
		setIsSearchOpen(prevState => !prevState)
		setIsFavoritesOpen(false)
	}

	if (!isAuthenticated) {
		return <Navigate to='/' />
	}

	return (
		<div className={styles.Dashboard}>
			<SideBar
				handleProfileClick={toggleProfile}
				handleFavoritesClick={toggleFavorites}
				handleSearchClick={toggleSearch}
			/>

			<div className={styles.map}>
				<Profile isFavoritesOpen={isProfileOpen} />

				<Favorites
					isFavoritesOpen={isFavoritesOpen}
					handleFavoritesClick={toggleFavorites}
				/>

				<Search isSearchOpen={isSearchOpen} handleSearchClick={toggleSearch} />

				<Map />
			</div>
		</div>
	)
}

export default Dashboard
