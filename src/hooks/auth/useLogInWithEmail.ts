import { signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { auth } from '@/API/Firebase'
import { IProps } from '@/Hooks/auth/Auth.type'
import { login } from '@/Store/Slices/AuthSlice'

const useSingInWithEmail = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const handleSingInWithEmail = async ({ userData, setUserData }: IProps) => {
		try {
			const user = await signInWithEmailAndPassword(
				auth,
				userData.email,
				userData.password
			)

			console.log('Пользователь успешно авторизован:', user.user)

			const token = user.user.refreshToken
			const photoURL = null
			const userEmail = userData.email

			dispatch(login({ token, userEmail, photoURL }))

			navigate('/dashboard')
		} catch (error: any) {
			console.error('Ошибка авторизации пользователя:', error)
			setUserData({
				message: error.message,
				typeAlert: 'Error',
				isActive: true,
			})
		}
	}

	return { handleSingInWithEmail }
}

export default useSingInWithEmail
