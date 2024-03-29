import styles from '../Search.module.scss'

interface Props {
	name: string
	img: string
}

const Item = ({ name, img }: Props) => {
	return (
		<div className={styles.item}>
			<div className={styles.ico}>
				<img src={img} alt='ico' />
			</div>
			<div className={styles.name}>{name}</div>
		</div>
	)
}

export default Item
