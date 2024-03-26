import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface IAuth {
	isAuthenticated: boolean
	token: string | null
	userEmail: string | null
}

const initialState: IAuth = {
	isAuthenticated: false,
	token: null,
	userEmail: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login(state, action: PayloadAction<{ token: string; userEmail: string }>) {
			state.isAuthenticated = true
			state.token = action.payload.token
			state.userEmail = action.payload.userEmail
			document.cookie = `token=${action.payload.token}; path=/;`
			localStorage.setItem('userEmail', action.payload.userEmail)
		},
		logout(state) {
			state.isAuthenticated = false
			state.token = null
			state.userEmail = null
			document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
			localStorage.removeItem('userEmail')
		},
	},
})

export const { login, logout } = authSlice.actions

export default authSlice.reducer
