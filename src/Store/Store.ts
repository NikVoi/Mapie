import { configureStore } from '@reduxjs/toolkit'
import authReducer, { login } from './Slices/AuthSlice'
import dashboardReducer from './Slices/DashboardSlice'
import distanceReducer from './Slices/DistanceSlice'
import favoritesReducer from './Slices/FavoritesSlice'
import placeDetailsReducer from './Slices/Place/PlaceDetailsSlice'
import placeReducer from './Slices/PlaceSlice'
import radiusReducer from './Slices/RadiusSlice'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		radiusSlice: radiusReducer,
		favorites: favoritesReducer,
		dashboard: dashboardReducer,
		place: placeReducer,
		distance: distanceReducer,
		placeDetails: placeDetailsReducer,
	},
})

const checkCookieForAuth = () => {
	const cookieToken = document.cookie
		.split('; ')
		.find(row => row.startsWith('token='))
	if (cookieToken) {
		const token = cookieToken.split('=')[1]
		store.dispatch(
			login({
				token,
				userEmail: localStorage.getItem('userEmail') || '',
				photoURL: localStorage.getItem('photoURL') || null,
			})
		)
	}
}

checkCookieForAuth()

export type RootState = ReturnType<typeof store.getState>
