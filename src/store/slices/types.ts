import { IPlace } from '@/types/types'

export interface IAuth {
	isAuthenticated: boolean
	token: string | null
	userEmail: string | null
	photoURL: string | null
}

export interface IFavoritesState {
	places: IPlace[]
}
