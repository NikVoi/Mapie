import classNames from 'classnames'
import { FC, MouseEventHandler, ReactNode } from 'react'
import styles from './MainButton.module.scss'

interface IButton {
	text?: string
	svg: ReactNode
	onClick?: MouseEventHandler<HTMLButtonElement>
}

const MainButton: FC<IButton> = ({ onClick, text, svg }) => {
	return (
		<button className={classNames(styles.button)} onClick={onClick}>
			{svg}
			{text}
		</button>
	)
}

export default MainButton
