import { FC, MouseEventHandler } from 'react'
import styles from './ButtonGoogle.module.scss'

interface IButton {
	text: string
	onClick: MouseEventHandler<HTMLButtonElement>
}

const ButtonGoogle: FC<IButton> = ({ onClick, text }) => {
	return (
		<button className={styles.button} onClick={onClick}>
			<img src={'./google.png'} className={styles.ico}></img>
			{text}
		</button>
	)
}

export default ButtonGoogle
