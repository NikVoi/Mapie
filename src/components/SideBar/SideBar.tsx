import { BookHeart, CircleUserRound, Search } from 'lucide-react'

import MainButton from '../UI/MainButton/MainButton'
import styles from './SideBar.module.scss'

interface Props {
	handleProfileClick: () => void
	handleFavoritesClick: () => void
	handleSearchClick: () => void
}

const SideBar = ({
	handleProfileClick,
	handleFavoritesClick,
	handleSearchClick,
}: Props) => {
	const photoURL = localStorage.getItem('photoURL')

	return (
		<aside className={styles.SideBar}>
			<div className={styles.logo}>
				<img src='/logo.svg' alt='logo'></img>
			</div>

			<div className={styles.wrapper}>
				<MainButton onClick={handleSearchClick} svg={<Search />} />
				<MainButton onClick={handleFavoritesClick} svg={<BookHeart />} />
			</div>

			<div className={styles.avatar} onClick={handleProfileClick}>
				{photoURL === '' ? (
					<div className={styles.avatar}>
						<CircleUserRound />
					</div>
				) : (
					<img
						src={photoURL ?? ''}
						alt='avatar'
						className={styles.avatar}
					></img>
				)}
			</div>
		</aside>
	)
}

export default SideBar
