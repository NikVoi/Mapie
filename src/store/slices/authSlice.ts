import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IAuth } from './types'

const initialState: IAuth = {
	isAuthenticated: false,
	token: null,
	userEmail: null,
	photoURL: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login(
			state,
			action: PayloadAction<{
				token: string
				userEmail: string
				photoURL: string | null
			}>
		) {
			state.isAuthenticated = true
			state.token = action.payload.token
			state.userEmail = action.payload.userEmail
			state.photoURL = action.payload.photoURL

			document.cookie = `token=${action.payload.token}; path=/;`
			localStorage.setItem('userEmail', action.payload.userEmail)
			localStorage.setItem(
				'photoURL',
				action.payload.photoURL ? action.payload.photoURL : ''
			)
		},
		logout(state) {
			state.isAuthenticated = false
			state.token = null
			state.userEmail = null
			state.photoURL = null

			document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
			localStorage.removeItem('userEmail')
			localStorage.removeItem('photoURL')
		},
	},
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
