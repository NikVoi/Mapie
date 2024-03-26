import { Link } from 'react-router-dom'

import useLogInWithGoogle from '../../hook/auth/useLogInWithGoogle'

import CustomAlert from '../CustomAlert/CustomAlert'
import Button from '../UI/Button/Button'
import ButtonGoogle from '../UI/ButtonGoogle/ButtonGoogle'
import styles from './SingUp.module.scss'

import { useState } from 'react'
import useSignUpWithEmailAndPassword from '../../hook//auth/useSignUpWithEmailAndPassword'
import AuthForm from '../AuthForm/AuthForm'

const SingUp = () => {
	const [userEmail, setUserEmail] = useState<string>('')
	const [userPassword, setUserPassword] = useState<string>('')
	const [message, setMessage] = useState<string>('')
	const [typeAlert, setTypeAlert] = useState<string>('')
	const [isActive, setIsActive] = useState<boolean>(false)

	const { signUpWithEmailAndPassword } = useSignUpWithEmailAndPassword()
	const { handleLogInWithGoogle } = useLogInWithGoogle()

	const handleInputEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserEmail(e.target.value)
	}

	const handleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUserPassword(e.target.value)
	}

	const handleSubmit = () => {
		signUpWithEmailAndPassword({
			userEmail,
			userPassword,
			setIsActive,
			setMessage,
			setTypeAlert,
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

				<Button text='Зарегистрироваться' onClick={handleSubmit} />

				<span className={styles.footer}>
					<span>Уже зарегистрированны?</span>
					<Link to={`/`} className={styles.link}>
						Войти в аккаунт
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

export default SingUp
