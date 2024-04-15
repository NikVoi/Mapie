import { configureStore } from '@reduxjs/toolkit'
import placeDetailsReducer from './slices/Place/placeDetailsSlice'
import authReducer, { login } from './slices/authSlice'
import dashboardReducer from './slices/dashboardSlice'
import distanceReducer from './slices/distanceSlice'
import favoritesReducer from './slices/favoritesSlice'
import placeReducer from './slices/placeSlice'
import radiusReducer from './slices/radiusSlice'

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
