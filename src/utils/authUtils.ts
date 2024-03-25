import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from '../firebase/firebase'

const handleLogInWithGoogle = async () => {
	try {
		const userCredential = await signInWithPopup(auth, googleProvider)
		const user = userCredential.user
		console.log('Пользователь успешно аутентифицирован с помощью Google:', user)
	} catch (error: any) {
		console.error('Ошибка аутентификации через Google:', error)
	}
}

export default handleLogInWithGoogle
