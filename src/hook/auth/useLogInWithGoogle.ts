import { signInWithPopup } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { auth, googleProvider } from '../../firebase/firebase'
import { login } from '../../store/slices/authSlice'
import { RootState } from '../../store/store'

const useLogInWithGoogle = () => {
	const dispatch = useDispatch()

	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	)

	const navigate = useNavigate()

	const handleLogInWithGoogle = async () => {
		try {
			const userCredential = await signInWithPopup(auth, googleProvider)
			const user = userCredential.user
			console.log(
				'Пользователь успешно аутентифицирован с помощью Google:',
				user
			)

			const token = 'ajksdbnfasikdjlbflsadikjfb'
			const userEmail = user.email ?? ''

			// Почему оно не воспренимаеться как string

			dispatch(login({ token, userEmail }))
			navigate('/dashboard')
		} catch (error: any) {
			console.error('Ошибка аутентификации через Google:', error)
		}
	}
	return { handleLogInWithGoogle }
}

export default useLogInWithGoogle
