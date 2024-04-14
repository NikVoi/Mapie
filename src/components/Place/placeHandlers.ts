import { setPlaceOpen, toggleFavorites } from '@/store/slices/dashboardSlice'
import { useDispatch } from 'react-redux'

export const handleToggleFavorites = () => {
	const dispatch = useDispatch()
	dispatch(toggleFavorites())
}

export const handleClose = () => {
	const dispatch = useDispatch()
	dispatch(setPlaceOpen(false))
}
