import { RootState } from '@/Store/Store'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const useLoader = () => {
	const [loading, setLoading] = useState(true)
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	)

	useEffect(() => {
		setLoading(!isAuthenticated)
	}, [isAuthenticated])

	return { loading, isAuthenticated }
}

export default useLoader
