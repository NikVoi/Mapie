import { useCallback } from 'react'
import { Link } from 'react-router-dom'

import useAuthenticationRedirect from '@/hooks/auth/useAuthRedirect'
import useSingInWithEmail from '@/hooks/auth/useLogInWithEmail'
import useLogInWithGoogle from '@/hooks/auth/useLogInWithGoogle'
import useUserData from '@hooks/auth/useUserData'

import AuthForm from '@/components/AuthForm/AuthForm'
import CustomAlert from '@/components/CustomAlert/CustomAlert'
import Button from '@/components/UI/Button/Button'
import ButtonGoogle from '@/components/UI/ButtonGoogle/ButtonGoogle'

import styles from './LogIn.module.scss'

export default function LogIn() {
	const [userData, setUserData] = useUserData()
	const { handleSingInWithEmail } = useSingInWithEmail()
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

	return (
		<section className={styles.login}>
			<div className={styles.wrapper}>
				<div className={styles.title}>Вход</div>
				<div className={styles.description}>Привет, с возвращением 👋</div>

				<ButtonGoogle text='Войти с Google' onClick={handleLogInWithGoogle} />

				<div className={styles.line}>или через почту</div>

				<AuthForm
					handleInputEmail={handleInputEmail}
					handleInputPassword={handleInputPassword}
				/>

				<Button
					text='Войти'
					onClick={() => {
						handleSingInWithEmail({
							userData,
							setUserData,
						})
					}}
				/>

				<span className={styles.footer}>
					<span>Не зарегистрированны?</span>
					<Link to={`/sing`} className={styles.link}>
						Создайть аккаунт
					</Link>
				</span>
			</div>

			<CustomAlert userData={userData} setUserData={setUserData} />
		</section>
	)
}
