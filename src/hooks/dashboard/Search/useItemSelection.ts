import { setTypes } from '@/store/slices/radiusSlice'
import { useDispatch } from 'react-redux'

const useItemSelection = () => {
	const dispatch = useDispatch()

	const handleItemClick = (item: any) => {
		dispatch(setTypes(item.type))
	}

	return { handleItemClick }
}

export default useItemSelection
