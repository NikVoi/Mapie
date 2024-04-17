import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import useLoader from '@/Hooks/useLoader'

import Favorites from '../Favorites/Favorites'
import Map from '../Map/Map'
import Profile from '../Profile/Profile'
import Search from '../Search/Search'
import SideBar from '../SideBar/SideBar'

import { PATH_TO_MAIN } from '@/Constant/Routes'
import Loader from '../Loader/Loader'
import Place from '../Place/Place'
import Road from '../Road/Road'
import styles from './Dashboard.module.scss'

const Dashboard = () => {
	const [destination, setDestination] = useState<{
		lat: number
		lng: number
	} | null>(null)

	const handleRouteClick = (destination: { lat: number; lng: number }) => {
		setDestination(destination)
	}

	const { loading, isAuthenticated } = useLoader()

	if (loading) {
		return <Loader />
	}

	if (!isAuthenticated) {
		return <Navigate to={`${PATH_TO_MAIN}`} />
	}

	return (
		<div className={styles.Dashboard}>
			<SideBar />

			<div className={styles.map}>
				<Profile />

				<Favorites />

				<Place onClick={handleRouteClick} />

				<Search />

				<Map destination={destination} />

				<Road />
			</div>
		</div>
	)
}

export default Dashboard
