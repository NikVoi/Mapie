import classNames from 'classnames'
import { X } from 'lucide-react'
import { FC, useEffect } from 'react'

import { IProps } from '@/Hooks/Auth/Auth.type'
import { createPortal } from 'react-dom'
import { getIcon, getMessage } from './Config'
import styles from './CustomAlert.module.scss'

const CustomAlert: FC<IProps> = ({ userData, setUserData }) => {
	const handleClose = () => {
		setUserData({ isActive: false })
	}

	useEffect(() => {
		if (userData.isActive) {
			const timer = setTimeout(() => {
				setUserData({ isActive: false })
			}, 5000)

			return () => clearTimeout(timer)
		}
	}, [userData.isActive])

	return createPortal(
		<section
			className={classNames(styles.modal, userData.isActive && styles.active)}
		>
			<div className={styles.content}>
				<i className={styles.info}>{getIcon(userData.typeAlert)}</i>

				<div className={styles.message}>
					<span>{userData.typeAlert}</span>
					<span>{getMessage(userData.message)}</span>
				</div>
			</div>
			<i className={styles.close} onClick={handleClose}>
				<X />
			</i>

			<div
				className={classNames(
					styles.progress,
					userData.isActive && styles.active
				)}
			></div>
		</section>,
		document.body
	)
}

export default CustomAlert
