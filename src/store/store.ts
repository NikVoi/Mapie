import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'

export type RootState = ReturnType<typeof store.getState>

const getTokenFromCookie = (): string | null => {
	return (
		document.cookie.replace(
			/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
			'$1'
		) || null
	)
}

const getUserEmailFromLocalStorage = (): string | null => {
	return localStorage.getItem('userEmail') || null
}

const initialAuthState = {
	isAuthenticated: !!getTokenFromCookie(),
	token: getTokenFromCookie(),
	userEmail: getUserEmailFromLocalStorage(),
}

export const store = configureStore({
	reducer: {
		auth: authReducer,
	},
	preloadedState: {
		auth: initialAuthState,
	},
})
