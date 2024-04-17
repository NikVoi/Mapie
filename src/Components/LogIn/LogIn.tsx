import { useCallback } from 'react'
import { Link } from 'react-router-dom'

import useAuthenticationRedirect from '@/Hooks/Auth/UseAuthRedirect'
import useSingInWithEmail from '@/Hooks/Auth/UseLogInWithEmail'
import useLogInWithGoogle from '@/Hooks/Auth/UseLogInWithGoogle'
import useUserData from '@/Hooks/Auth/UseUserData'

import AuthForm from '@/Components/AuthForm/AuthForm'
import CustomAlert from '@/Components/CustomAlert/CustomAlert'
import Button from '@/Components/UI/Button/Button'
import ButtonGoogle from '@/Components/UI/ButtonGoogle/ButtonGoogle'

import { PATH_TO_DASHBOARD } from '@/Constant/Routes'
import styles from './LogIn.module.scss'

export default function LogIn() {
	const [userData, setUserData] = useUserData()
	const { handleSingInWithEmail } = useSingInWithEmail()
	const { handleLogInWithGoogle } = useLogInWithGoogle()
	const redirectComponent = useAuthenticationRedirect({
		authenticatedRedirectPath: `${PATH_TO_DASHBOARD}`,
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

	const handleLogIn = () => {
		handleSingInWithEmail({
			userData,
			setUserData,
		})
	}

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

				<Button text='Войти' onClick={handleLogIn} />

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
