import { CircleUserRound, LogOut } from 'lucide-react'
import { useDispatch } from 'react-redux'

import { logout } from '@/store/slices/authSlice'

import classNames from 'classnames'
import MainButton from '../UI/MainButton/MainButton'
import styles from './Profile.module.scss'

interface Props {
	isFavoritesOpen: boolean
}

const Profile = ({ isFavoritesOpen }: Props) => {
	const dispatch = useDispatch()

	const handleLogOut = () => {
		dispatch(logout())
	}

	const userEmail = localStorage.getItem('userEmail')
	const photoURL = localStorage.getItem('photoURL')

	return (
		<section
			className={classNames(styles.Profile, {
				[styles.open]: isFavoritesOpen,
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
