import { FC, memo } from 'react'

import Input from '@/Components/UI/Input/Input'
import styles from './AuthForm.module.scss'
import { IProps } from './AuthForm.type'

const AuthForm: FC<IProps> = memo(
	({ handleInputEmail, handleInputPassword }) => {
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
)

export default AuthForm
