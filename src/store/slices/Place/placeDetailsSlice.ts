import { RootState } from '@/store/store'
import { IPlace } from '@/types/types'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const placeDetailsSlice = createSlice({
	name: 'placeDetails',
	initialState: {
		selectedPlace: null as IPlace | null,
	},
	reducers: {
		setPlaceDetails: (state, action: PayloadAction<IPlace | null>) => {
			state.selectedPlace = action.payload
		},
	},
})

export const { setPlaceDetails } = placeDetailsSlice.actions
export const selectPlaceDetails = (state: RootState) =>
	state.placeDetails.selectedPlace
export default placeDetailsSlice.reducer
