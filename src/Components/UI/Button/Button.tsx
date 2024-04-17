import { FC, MouseEventHandler, ReactNode } from 'react'
import styles from './Button.module.scss'

interface IButton {
	text?: string
	img?: string
	svg?: ReactNode
	onClick?: MouseEventHandler<HTMLButtonElement>
}

const Button: FC<IButton> = ({ onClick, text, img, svg }) => {
	return (
		<button className={styles.button} onClick={onClick}>
			{img && <img src={img} className={styles.ico}></img>}
			{svg}
			<span>{text}</span>
		</button>
	)
}

export default Button
