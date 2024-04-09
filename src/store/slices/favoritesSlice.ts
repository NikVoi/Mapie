import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

interface Photos {
	name: string
	widthPx: number
	heightPx: number
}

interface Place {
	id: string
	displayName: {
		languageCode: string
		text: string
	}
	editorialSummary: {
		languageCode: string
		text: string
	}
	photos: Photos[]
	primaryType: string
	types: string[]
	location: {
		latitude: number
		longitude: number
	}
}

interface FavoritesState {
	places: Place[]
}

const initialState: FavoritesState = {
	places: JSON.parse(localStorage.getItem('favorites') || '[]'),
}

const favoritesSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		addPlace: (state, action: PayloadAction<Place>) => {
			state.places.push(action.payload)
			localStorage.setItem('favorites', JSON.stringify(state.places))
		},
		removePlace: (state, action: PayloadAction<string>) => {
			state.places = state.places.filter(place => place.id !== action.payload)
			localStorage.setItem('favorites', JSON.stringify(state.places))
		},
	},
})

export const { addPlace, removePlace } = favoritesSlice.actions

export const selectFavorites = (state: RootState) => state.favorites.places

export default favoritesSlice.reducer
