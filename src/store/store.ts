import { configureStore } from '@reduxjs/toolkit'
import authReducer, { login } from './slices/authSlice'

export const store = configureStore({
	reducer: {
		auth: authReducer,
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
