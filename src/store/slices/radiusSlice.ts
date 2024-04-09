import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IRadius {
	radiusSlice: number
	types: string
}

const initialState: IRadius = {
	radiusSlice: 1000,
	types: '',
}

const radiusSlice = createSlice({
	name: 'radius',
	initialState,
	reducers: {
		setRadius(state, action: PayloadAction<number>) {
			state.radiusSlice = action.payload
		},
		setTypes: (state, action) => {
			state.types = action.payload
		},
	},
})

export const { setRadius, setTypes } = radiusSlice.actions

export default radiusSlice.reducer
