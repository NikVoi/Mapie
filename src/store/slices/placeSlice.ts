import { RootState } from '@/Store/Store'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

interface PlaceState {
	selectedPlace: any
}

const initialState: PlaceState = {
	selectedPlace: null,
}

export const placeSlice = createSlice({
	name: 'places',
	initialState,
	reducers: {
		selectPlace: (state: PlaceState, action: PayloadAction<any>) => {
			const { place_id, geometry } = action.payload
			const { lat, lng } = geometry.location

			state.selectedPlace = {
				place_id,
				location: { lat: lat(), lng: lng() },
			}
		},
		clearSelectedPlace: (state: PlaceState) => {
			state.selectedPlace = null
		},
	},
})

export const { selectPlace, clearSelectedPlace } = placeSlice.actions

export const selectSelectedPlace = (state: RootState) =>
	state.place.selectedPlace

export default placeSlice.reducer
