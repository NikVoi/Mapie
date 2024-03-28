import styles from '../Search.module.scss'

interface Props {
	id: number
	name: string
	img: string
}

const Item = ({ id, name, img }: Props) => {
	return (
		<div className={styles.item} key={id}>
			<div className={styles.ico}>
				<img src={img} alt='ico' />
			</div>
			<div className={styles.name}>{name}</div>
		</div>
	)
}

export default Item
