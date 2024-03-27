import MainButton from '@/components/UI/MainButton/MainButton'
import { BookHeart, MapPin } from 'lucide-react'
import styles from './Favorite.module.scss'

const Favorite = () => {
	const click = () => {
		console.log('click')
	}

	return (
		<section className={styles.favorite}>
			<div className={styles.img}></div>

			<div className={styles.categories}></div>

			<div className={styles.name}>Lorem ipsum dolor sit amet consectetur </div>

			<div className={styles.description}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt nam,
				nobis aliquid illum quia veritatis eos, rem hic velit eum et molestias
				rerum fugiat porro architecto libero unde? Maiores, aliquid.
			</div>

			<div className={styles.wrapper}>
				<MainButton text='Сохраннено' onClick={click} svg={<BookHeart />} />
				<MainButton text='Маршрут' onClick={click} svg={<MapPin />} />
			</div>
		</section>
	)
}

export default Favorite
