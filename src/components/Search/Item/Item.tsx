import classNames from 'classnames'
import styles from '../Search.module.scss'

interface Props {
	name: string
	img: string
	onClick: () => void
	isActive: boolean
}

const Item = ({ name, img, onClick, isActive }: Props) => {
	return (
		<div
			className={classNames(styles.item, { [styles.active]: isActive })}
			onClick={onClick}
		>
			<div className={styles.ico}>
				<img src={img} alt='ico' />
			</div>
			<div className={styles.name}>{name}</div>
		</div>
	)
}

export default Item
