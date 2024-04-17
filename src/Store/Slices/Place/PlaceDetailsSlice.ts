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
	},
})

export const { setPlaceDetails } = placeDetailsSlice.actions
export const selectPlaceDetails = (state: RootState) =>
	state.placeDetails.selectedPlace
export default placeDetailsSlice.reducer
