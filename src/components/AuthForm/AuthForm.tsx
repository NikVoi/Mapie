import Input from '@/components/UI/Input/Input'

import styles from './AuthForm.module.scss'

interface Props {
	handleInputEmail: (e: React.ChangeEvent<HTMLInputElement>) => void
	handleInputPassword: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const AuthForm = ({ handleInputEmail, handleInputPassword }: Props) => {
	return (
		<form className={styles.form}>
			<Input
				type='email'
				label='Введите почту'
				placeholder='exemple@mail.com'
				onChange={handleInputEmail}
			/>

			<Input
				type='password'
				label='Введите пароль'
				placeholder='•••••••••'
				onChange={handleInputPassword}
			/>
		</form>
	)
}

export default AuthForm
