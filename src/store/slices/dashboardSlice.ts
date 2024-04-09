import { createSlice } from '@reduxjs/toolkit'

export const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState: {
		isProfileOpen: false,
		isFavoritesOpen: false,
		isSearchOpen: false,
		isPlaceOpen: false,
	},
	reducers: {
		toggleProfile: state => {
			state.isProfileOpen = !state.isProfileOpen
		},
		toggleFavorites: state => {
			state.isFavoritesOpen = !state.isFavoritesOpen
			state.isSearchOpen = false
			state.isPlaceOpen = false
		},
		togglePlace: state => {
			state.isPlaceOpen = true
			state.isFavoritesOpen = false
			state.isSearchOpen = false
		},
		toggleSearch: state => {
			state.isSearchOpen = !state.isSearchOpen
			state.isFavoritesOpen = false
			state.isPlaceOpen = false
		},
		setProfileOpen: (state, action) => {
			state.isProfileOpen = action.payload
		},
		setFavoritesOpen: (state, action) => {
			state.isFavoritesOpen = action.payload
		},
		setSearchOpen: (state, action) => {
			state.isSearchOpen = action.payload
		},
		setPlaceOpen: (state, action) => {
			state.isPlaceOpen = action.payload
		},
	},
})

export const {
	toggleProfile,
	toggleFavorites,
	togglePlace,
	toggleSearch,
	setProfileOpen,
	setFavoritesOpen,
	setSearchOpen,
	setPlaceOpen,
} = dashboardSlice.actions

export default dashboardSlice.reducer
