import classNames from 'classnames'
import { FC, MouseEventHandler, ReactNode } from 'react'
import styles from './SideButton.module.scss'

interface IButton {
	svg: ReactNode
	onClick: MouseEventHandler<HTMLButtonElement>
	isActive?: boolean
}

const SideButton: FC<IButton> = ({ onClick, svg, isActive }) => {
	return (
		<button
			className={classNames(styles.button, { [styles.active]: isActive })}
			onClick={onClick}
		>
			{svg}
		</button>
	)
}

export default SideButton
