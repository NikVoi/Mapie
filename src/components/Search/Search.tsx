import classNames from 'classnames'
import { ChevronLeft } from 'lucide-react'
import Input from '../UI/Input/Input'
import Item from './Item/Item'
import styles from './Search.module.scss'
import { data } from './search.data'

interface Props {
	isSearchOpen: boolean
	handleSearchClick: () => void
}

const Search = ({ isSearchOpen, handleSearchClick }: Props) => {
	return (
		<section
			className={classNames(styles.search, {
				[styles.open]: isSearchOpen,
			})}
		>
			<div className={styles.main}>
				<div className={styles.input}>
					<Input placeholder='Место, адрес..' />
				</div>

				<div className={styles.title}>Искать:</div>

				<div className={styles.wrapper}>
					{data.map(item => (
						<Item key={item.id} name={item.name} img={item.img} />
					))}
				</div>

				<div className={styles.title}>В радиусе</div>
				<div className={styles.inputKM}>
					<Input placeholder='5' />
					<span>км</span>
				</div>
			</div>

			<button className={styles.close} onClick={handleSearchClick}>
				<ChevronLeft />
			</button>
		</section>
	)
}

export default Search
