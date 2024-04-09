import { CircleUserRound, LogOut } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '@/store/slices/authSlice'

import { RootState } from '@/store/store'
import classNames from 'classnames'
import MainButton from '../UI/MainButton/MainButton'
import styles from './Profile.module.scss'

const Profile = () => {
	const dispatch = useDispatch()

	const handleLogOut = () => {
		dispatch(logout())
	}

	const { isProfileOpen } = useSelector((state: RootState) => state.dashboard)

	const userEmail = localStorage.getItem('userEmail')
	const photoURL = localStorage.getItem('photoURL')

	return (
		<section
			className={classNames(styles.Profile, {
				[styles.open]: isProfileOpen,
			})}
		>
			{photoURL === '' ? (
				<div className={styles.avatar}>
					<CircleUserRound />
				</div>
			) : (
				<img src={photoURL ?? ''} alt='avatar' className={styles.avatar}></img>
			)}

			<div className={styles.text}>{userEmail}</div>

			<MainButton svg={<LogOut />} onClick={handleLogOut} />
		</section>
	)
}

export default Profile
