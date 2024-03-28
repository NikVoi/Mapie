import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'

export type RootState = ReturnType<typeof store.getState>

export const store = configureStore({
	reducer: {
		auth: authReducer,
	},
})
