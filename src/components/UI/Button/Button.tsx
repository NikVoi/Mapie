import { FC, MouseEventHandler } from 'react'
import styles from './Button.module.scss'

interface IButton {
	text: string
	img?: string
	onClick: MouseEventHandler<HTMLButtonElement>
}

const Button: FC<IButton> = ({ onClick, text, img }) => {
	return (
		<button className={styles.button} onClick={onClick}>
			{img && <img src={img} className={styles.ico}></img>}
			{text}
		</button>
	)
}

export default Button
