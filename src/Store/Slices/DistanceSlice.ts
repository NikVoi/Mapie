import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface MapState {
	polylineRef: any
	distance: string | null
	duration: string | null
	clearRoute: boolean
	route: any | null
	destination: { lat: number; lng: number } | null
	isWindowOpen: boolean
}

const initialState: MapState = {
	polylineRef: null,
	distance: null,
	duration: null,
	clearRoute: false,
	route: null,
	destination: null,
	isWindowOpen: false,
}

const distanceSlice = createSlice({
	name: 'map',
	initialState,
	reducers: {
		setPolylineRef(state, action: PayloadAction<any>) {
			state.polylineRef = action.payload
		},
		setDistance(state, action: PayloadAction<string | null>) {
			state.distance = action.payload
		},
		setDuration(state, action: PayloadAction<string | null>) {
			state.duration = action.payload
		},
		setClearRoute(state, action: PayloadAction<boolean>) {
			state.clearRoute = action.payload
		},
		setDestination(
			state,
			action: PayloadAction<{ lat: number; lng: number } | null>
		) {
			state.destination = action.payload
		},
		setIsWindowOpen(state, action: PayloadAction<boolean>) {
			state.isWindowOpen = action.payload
		},
		// дорога
		setRoute(state, action: PayloadAction<any | null>) {
			state.route = action.payload
		},
		clearRoute(state) {
			state.route = null
		},
	},
})

export const {
	setPolylineRef,
	setDistance,
	setDuration,
	setClearRoute,
	setRoute,
	setDestination,
	setIsWindowOpen,
	clearRoute,
} = distanceSlice.actions

export default distanceSlice.reducer
