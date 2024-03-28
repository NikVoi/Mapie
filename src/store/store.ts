import { Reducer, configureStore } from '@reduxjs/toolkit'
import authReducer, { IAuth } from './slices/authSlice'

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

const getUserPhotoURLFromLocalStorage = (): string | null => {
	return localStorage.getItem('photoURL') || null
}

const initialAuthState: IAuth = {
	isAuthenticated: !!getTokenFromCookie(),
	token: getTokenFromCookie(),
	userEmail: getUserEmailFromLocalStorage(),
	photoURL: getUserPhotoURLFromLocalStorage(),
}

export const store = configureStore({
	reducer: {
		auth: authReducer as Reducer<IAuth>,
	},
	preloadedState: {
		auth: initialAuthState,
	},
})
