import classNames from 'classnames'
import { CircleUserRound, LogOut } from 'lucide-react'
import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { logout } from '@/Store/Slices/AuthSlice'
import { RootState } from '@/Store/Store'

import MainButton from '../UI/MainButton/MainButton'
import styles from './Profile.module.scss'

const Profile = () => {
	const dispatch = useDispatch()

	const handleLogOut = useCallback(() => {
		dispatch(logout())
	}, [dispatch])

	const { isProfileOpen } = useSelector((state: RootState) => state.dashboard)

	const userEmail = useMemo(() => localStorage.getItem('userEmail'), [])
	const photoURL = useMemo(() => localStorage.getItem('photoURL'), [])

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
