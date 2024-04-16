import { createUserWithEmailAndPassword } from 'firebase/auth'

import { auth } from '@/API/Firebase'
import { IProps } from './Auth.type'

const useSignUpWithEmailAndPassword = () => {
	const signUpWithEmailAndPassword = async ({
		userData,
		setUserData,
	}: IProps) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				userData.email,
				userData.password
			)
			const user = userCredential.user
			console.log('Пользователь успешно зарегистрирован:', user)

			setUserData({
				message: 'Success',
				typeAlert: 'Success',
				isActive: true,
			})
		} catch (error: any) {
			console.error('Ошибка регистрации пользователя:', error)
			console.log(error.message)
			setUserData({
				message: error.message,
				typeAlert: 'Error',
				isActive: true,
			})
		}
	}

	return { signUpWithEmailAndPassword }
}

export default useSignUpWithEmailAndPassword
