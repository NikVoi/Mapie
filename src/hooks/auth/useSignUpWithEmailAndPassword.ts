import { createUserWithEmailAndPassword } from 'firebase/auth'

import { auth } from '@/firebase'

interface Props {
	userEmail: string
	userPassword: string
	setTypeAlert: React.Dispatch<React.SetStateAction<string>>
	setMessage: React.Dispatch<React.SetStateAction<string>>
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

const useSignUpWithEmailAndPassword = () => {
	const signUpWithEmailAndPassword = async ({
		userEmail,
		userPassword,
		setIsActive,
		setMessage,
		setTypeAlert,
	}: Props) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				userEmail,
				userPassword
			)
			const user = userCredential.user
			console.log('Пользователь успешно зарегистрирован:', user)

			setTypeAlert('Success')
			setMessage('Success')
			setIsActive(true)
		} catch (error: any) {
			console.error('Ошибка регистрации пользователя:', error)
			console.log(error.message)

			setMessage(error.message)
			setTypeAlert('Error')
			setIsActive(true)
		}
	}

	return { signUpWithEmailAndPassword }
}

export default useSignUpWithEmailAndPassword
