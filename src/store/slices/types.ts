import { IPlace } from '@/Types/Types'

export interface IAuth {
	isAuthenticated: boolean
	token: string | null
	userEmail: string | null
	photoURL: string | null
}

export interface IFavoritesState {
	places: IPlace[]
}
