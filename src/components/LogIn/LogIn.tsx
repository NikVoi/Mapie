import { useState } from 'react'
import { Link } from 'react-router-dom'

import handleLogInWithGoogle from '../../utils/authUtils'

import useSingInWithEmail from '../../hook/auth/useLogInWithEmail'
import AuthForm from '../AuthForm/AuthForm'
import CustomAlert from '../CustomAlert/CustomAlert'
import Button from '../UI/Button/Button'
import ButtonGoogle from '../UI/ButtonGoogle/ButtonGoogle'
import styles from './LogIn.module.scss'

export default function LogIn() {
	const [userEmail, setUserEmail] = useState<string>('')
	const [userPassword, setUserPassword] = useState<string>('')
	const [message, setMessage] = useState<string>('')
	const [typeAlert, setTypeAlert] = useState<string>('')
	const [isActive, setIsActive] = useState<boolean>(false)

	const { SingInWithEmail } = useSingInWithEmail()

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
