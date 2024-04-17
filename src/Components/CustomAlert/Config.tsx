import { Check, ShieldAlert, ShieldX } from 'lucide-react'
import { ReactNode } from 'react'
import styles from './CustomAlert.module.scss'

export const getIcon = (type: string): ReactNode => {
	switch (type) {
		case 'Success':
			return <Check className={styles.success} />
		case 'Warning':
			return <ShieldAlert className={styles.warning} />
		case 'Error':
			return <ShieldX className={styles.error} />
		default:
			return null
	}
}

export const getMessage = (text: string): string => {
	switch (text) {
		case 'Firebase: Error (auth/email-already-in-use).':
			return 'Пользователь с такой почтой уже существует!'
		case 'Firebase: Password should be at least 6 characters (auth/weak-password).':
			return 'Пароль должен быть из 6 символов'
		case 'Firebase: Error (auth/invalid-email).':
			return 'Неверный адрес электронной почты'
		case 'Firebase: Error (auth/missing-password).':
			return 'Пропущенный пароль'
		case 'Firebase: Error (auth/invalid-credential).':
			return 'Недопустимые учетные данные'

		case 'Success':
			return 'Вы успешно зарегистрировались'
		default:
			return ''
	}
}
