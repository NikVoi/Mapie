import { BookHeart, ChevronRight } from 'lucide-react'
import styles from './Item.module.scss'

const Item = () => {
	return (
		<div className={styles.item}>
			<div className={styles.wrapper}>
				<div className={styles.img}></div>
				{/* <img src='asda' alt='img' /> */}
				<div className={styles.name}>Lorem ipsum, dolor sit</div>
			</div>

			<div className={styles.description}>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam
				eaque magnam voluptate nemo sapiente culpa autem. Optio fugiat impedit
				nobis expedita, dolor inventore officia iste totam tenetur veniam esse
				quaerat.
			</div>

			<div className={styles.wrapper}>
				<button>
					<BookHeart />
				</button>
				<button>
					<ChevronRight />
				</button>
			</div>
		</div>
	)
}

export default Item
