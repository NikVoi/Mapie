import classNames from 'classnames'
import { ChevronLeft } from 'lucide-react'
import Input from '../UI/Input/Input'
import MainButton from '../UI/MainButton/MainButton'
import styles from './Favorites.module.scss'
import Item from './Item/Item'

interface Props {
	isFavoritesOpen: boolean
	handleFavoritesClick: () => void
}

const Favorites = ({ isFavoritesOpen, handleFavoritesClick }: Props) => {
	const handleClose = () => {
		handleFavoritesClick()
	}

	return (
		<section
			className={classNames(styles.favorites, {
				[styles.open]: isFavoritesOpen,
			})}
		>
			<div className={styles.main}>
				<div className={styles.search}>
					<Input placeholder='Место, адрес..' />
				</div>

				<div className={styles.title}>
					<MainButton svg={<ChevronLeft />} />
					<span>Избранное:</span>
				</div>

				<div className={styles.wrapper}>
					<Item />
					<Item />
					<Item />
				</div>

				{/* <Favorite /> */}
			</div>

			<button className={styles.close} onClick={handleClose}>
				<ChevronLeft />
			</button>
		</section>
	)
}

export default Favorites
