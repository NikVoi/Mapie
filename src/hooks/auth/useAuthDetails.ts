import { useState } from 'react'

const useAuthDetails = () => {
	const [authDetails, setAuthDetails] = useState({
		userPassword: '',
		userEmail: '',
		errorMessage: '',
	})

	const [isSuccess, setIsSuccess] = useState<boolean>(false)
	const [isError, setIsError] = useState<boolean>(false)

	return {
		authDetails,
		setAuthDetails,
		isSuccess,
		setIsSuccess,
		isError,
		setIsError,
	}
}

export default useAuthDetails
