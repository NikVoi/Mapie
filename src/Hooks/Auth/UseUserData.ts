import { useState } from 'react'
import { IUserData } from './Auth.type'

const useUserData = (): [IUserData, (data: Partial<IUserData>) => void] => {
	const [userData, setUserData] = useState<IUserData>({
		email: '',
		password: '',
		message: '',
		typeAlert: '',
		isActive: false,
	})

	const updateUserData = (data: Partial<IUserData>) => {
		setUserData(prevState => ({ ...prevState, ...data }))
	}

	return [userData, updateUserData]
}

export default useUserData
