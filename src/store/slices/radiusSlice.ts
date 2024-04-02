import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IRadius {
	radiusSlice: number
}

const initialState: IRadius = {
	radiusSlice: 1000,
}

const radiusSlice = createSlice({
	name: 'radius',
	initialState,
	reducers: {
		setRadius(state, action: PayloadAction<number>) {
			state.radiusSlice = action.payload
		},
	},
})

export const { setRadius } = radiusSlice.actions

export default radiusSlice.reducer
