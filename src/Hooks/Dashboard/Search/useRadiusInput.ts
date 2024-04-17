import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setRadius } from '@/Store/Slices/RadiusSlice'
import { RootState } from '@/Store/Store'

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
