import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

import useLoader from '@/hooks/useLoader'
import { RootState } from '@/store/store'

import Favorites from '../Favorites/Favorites'
import Loader from '../Loader/Loader'
import Map from '../Map/Map'
import Place from '../Place/Place'
import Profile from '../Profile/Profile'
import Search from '../Search/Search'
import SideBar from '../SideBar/SideBar'

import styles from './Dashboard.module.scss'

const Dashboard = () => {
	const [placeDetails, setPlaceDetails] = useState<any>(null)

	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	)

	const loading = useLoader()

	if (!isAuthenticated) {
		return <Navigate to='/' />
	}

	if (loading) {
		return <Loader />
	}

	return (
		<div className={styles.Dashboard}>
			<SideBar />

			<div className={styles.map}>
				<Profile />

				<Favorites setPlaceDetails={setPlaceDetails} />

				<Place placeDetails={placeDetails} />

				<Search />

				<Map setPlaceDetails={setPlaceDetails} />
			</div>
		</div>
	)
}

export default Dashboard
