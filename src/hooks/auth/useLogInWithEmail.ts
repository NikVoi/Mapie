import { signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { login } from '@store/slices/authSlice'
import { RootState } from '@store/store'
import { auth } from '../../firebase'

interface Props {
	userEmail: string
	userPassword: string
	setTypeAlert: React.Dispatch<React.SetStateAction<string>>
	setMessage: React.Dispatch<React.SetStateAction<string>>
	setIsActive: React.Dispatch<React.SetStateAction<boolean>>
}

const useSingInWithEmail = () => {
	const dispatch = useDispatch()
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	)

	const navigate = useNavigate()

	const SingInWithEmail = async ({
		userEmail,
		userPassword,
		setIsActive,
		setMessage,
		setTypeAlert,
	}: Props) => {
		try {
			const user = await signInWithEmailAndPassword(
				auth,
				userEmail,
				userPassword
			)

			console.log('Пользователь успешно авторизован:', user.user)

			const token = 'ajksdbnfasikdjlbflsadikjfb'

			dispatch(login({ token, userEmail }))

			navigate('/dashboard')
		} catch (error: any) {
			console.error('Ошибка авторизации пользователя:', error)
			setMessage(error.message)
			setTypeAlert('Error')
			setIsActive(true)
		}
	}

	return { SingInWithEmail }
}

export default useSingInWithEmail
