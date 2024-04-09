import styles from '../Search.module.scss'

interface Props {
	name: string
	img: string
	onClick: () => void
}

const Item = ({ name, img, onClick }: Props) => {
	return (
		<div className={styles.item} onClick={onClick}>
			<div className={styles.ico}>
				<img src={img} alt='ico' />
			</div>
			<div className={styles.name}>{name}</div>
		</div>
	)
}

export default Item
