import { setRadius } from '@/store/slices/radiusSlice'
import { RootState } from '@/store/store'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const useRadiusInput = () => {
	const dispatch = useDispatch()
	const radius = useSelector(
		(state: RootState) => state.radiusSlice.radiusSlice
	)
	const [inputValue, setInputValue] = useState((radius / 1000).toString())

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value
		setInputValue(inputValue)
		const newRadius = parseFloat(inputValue)
		if (inputValue === '' || isNaN(newRadius)) {
			dispatch(setRadius(0))
		} else {
			dispatch(setRadius(newRadius * 1000))
		}
	}

	return { inputValue, handleChange }
}

export default useRadiusInput
