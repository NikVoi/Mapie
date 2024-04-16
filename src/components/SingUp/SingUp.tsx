import { useCallback } from 'react'
import { Link } from 'react-router-dom'

import useAuthenticationRedirect from '@/Hooks/auth/UseAuthRedirect'
import useLogInWithGoogle from '@/Hooks/auth/UseLogInWithGoogle'
import useSignUpWithEmailAndPassword from '@/Hooks/auth/UseSignUpWithEmailAndPassword'
import useUserData from '@/Hooks/auth/UseUserData'

import AuthForm from '@/Components/AuthForm/AuthForm'
import CustomAlert from '@/Components/CustomAlert/CustomAlert'
import Button from '@/Components/UI/Button/Button'
import ButtonGoogle from '@/Components/UI/ButtonGoogle/ButtonGoogle'

import styles from './SingUp.module.scss'

const SingUp = () => {
	const [userData, setUserData] = useUserData()
	const { signUpWithEmailAndPassword } = useSignUpWithEmailAndPassword()
	const { handleLogInWithGoogle } = useLogInWithGoogle()
	const redirectComponent = useAuthenticationRedirect({
		authenticatedRedirectPath: '/dashboard',
	})

	if (redirectComponent) {
		return redirectComponent
	}

	const handleInputEmail = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setUserData({ email: e.target.value })
		},
		[userData, setUserData]
	)

	const handleInputPassword = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setUserData({ password: e.target.value })
		},
		[userData, setUserData]
	)

	const handleSignUpClick = () => {
		signUpWithEmailAndPassword({
			userData,
			setUserData,
		})
	}

	return (
		<section className={styles.sing}>
			<div className={styles.wrapper}>
				<div className={styles.title}>Регистрация</div>
				<div className={styles.description}>Привет, присойденяйся к нам 👋</div>

				<ButtonGoogle text='Войти с Google' onClick={handleLogInWithGoogle} />

				<div className={styles.line}>или через почту</div>

				<AuthForm
					handleInputEmail={handleInputEmail}
					handleInputPassword={handleInputPassword}
				/>

				<Button text='Зарегистрироваться' onClick={handleSignUpClick} />

				<span className={styles.footer}>
					<span>Уже зарегистрированны?</span>
					<Link to={`/`} className={styles.link}>
						Войти в аккаунт
					</Link>
				</span>
			</div>

			<CustomAlert userData={userData} setUserData={setUserData} />
		</section>
	)
}

export default SingUp
