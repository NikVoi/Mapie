import { configureStore } from '@reduxjs/toolkit'
import authReducer, { login } from './slices/authSlice'
import radiusReducer from './slices/radiusSlice'

export const store = configureStore({
	reducer: {
		auth: authReducer,
		radiusSlice: radiusReducer,
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
