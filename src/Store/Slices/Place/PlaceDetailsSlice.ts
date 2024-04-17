import { RootState } from '@/Store/Store'
import { IPlace } from '@/Types/Types'
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
		clearPlaceDetails: state => {
			state.selectedPlace = null
		},
	},
})

export const { setPlaceDetails, clearPlaceDetails } = placeDetailsSlice.actions
export const selectPlaceDetails = (state: RootState) =>
	state.placeDetails.selectedPlace
export default placeDetailsSlice.reducer
