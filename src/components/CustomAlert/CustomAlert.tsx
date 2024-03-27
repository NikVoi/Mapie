import classNames from 'classnames'
import { X } from 'lucide-react'
import { FC, useEffect } from 'react'

import styles from './CustomAlert.module.scss'
import { getIcon, getMessage } from './alertUtils'
import { IAlert } from './type'

const CustomAlert: FC<IAlert> = ({ type, text, isActive, setIsActive }) => {
	const handleClose = () => {
		setIsActive(false)
	}

	useEffect(() => {
		if (isActive) {
			const timer = setTimeout(() => {
				setIsActive(false)
			}, 5000)

			return () => clearTimeout(timer)
		}
	}, [isActive, setIsActive])

	return (
		<section className={classNames(styles.modal, isActive && styles.active)}>
			<div className={styles.content}>
				<i className={styles.info}>{getIcon(type)}</i>

				<div className={styles.message}>
					<span>{type}</span>
					<span>{getMessage(text)}</span>
				</div>
			</div>
			<i className={styles.close} onClick={handleClose}>
				<X />
			</i>

			<div
				className={classNames(styles.progress, isActive && styles.active)}
			></div>
		</section>
	)
}

export default CustomAlert
