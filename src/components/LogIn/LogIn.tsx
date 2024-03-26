import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'

import useSingInWithEmail from '@/hooks/auth/useLogInWithEmail'
import useLogInWithGoogle from '@/hooks/auth/useLogInWithGoogle'

import AuthForm from '@/components/AuthForm/AuthForm'
import CustomAlert from '@/components/CustomAlert/CustomAlert'
import Button from '@/components/UI/Button/Button'
import ButtonGoogle from '@/components/UI/ButtonGoogle/ButtonGoogle'

import { RootState } from '@/store/store'

import styles from './LogIn.module.scss'

export default function LogIn() {
	const [userEmail, setUserEmail] = useState<string>('')
	const [userPassword, setUserPassword] = useState<string>('')
	const [message, setMessage] = useState<string>('')
	const [typeAlert, setTypeAlert] = useState<string>('')
	const [isActive, setIsActive] = useState<boolean>(false)

	const { SingInWithEmail } = useSingInWithEmail()
	const { handleLogInWithGoogle } = useLogInWithGoogle()

	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	)

	if (isAuthenticated) {
		return <Navigate to='/dashboard' />
	}

	const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserEmail(e.target.value)
	}
	const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserPassword(e.target.value)
	}

	const handleSubmit = () => {
		SingInWithEmail({
			userEmail,
			userPassword,
			setIsActive,
			setMessage,
			setTypeAlert,
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

				<Button text='Войти' onClick={handleSubmit} />

				<span className={styles.footer}>
					<span>Не зарегистрированны?</span>
					<Link to={`/sing`} className={styles.link}>
						Создайть аккаунт
					</Link>
				</span>
			</div>

			<CustomAlert
				type={typeAlert}
				text={message}
				isActive={isActive}
				setIsActive={setIsActive}
			/>
		</section>
	)
}
