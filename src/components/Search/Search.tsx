import { setRadius } from '@/store/slices/radiusSlice'
import { RootState } from '@/store/store'
import classNames from 'classnames'
import { ChevronLeft } from 'lucide-react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Input from '../UI/Input/Input'
import Item from './Item/Item'
import styles from './Search.module.scss'
import { data } from './search.data'

interface Props {
	isSearchOpen: boolean
	handleSearchClick: () => void
}

const Search = ({ isSearchOpen, handleSearchClick }: Props) => {
	const dispatch = useDispatch()
	const radius = useSelector(
		(state: RootState) => state.radiusSlice.radiusSlice
	)
	const [inputValue, setInputValue] = useState((radius / 1000).toString())

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = event.target.value
		const newRadius = parseFloat(inputValue)
		if (inputValue === '') {
			// Если строка ввода пуста
			dispatch(setRadius(0)) // Установить радиус в 0
			setInputValue('0') // Установить значение ввода в '0'
		} else if (!isNaN(newRadius)) {
			// Если значение удалось преобразовать в число
			dispatch(setRadius(newRadius * 1000)) // Установить новое значение радиуса
		}
		setInputValue(inputValue) // Обновить значение ввода
	}

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
					<Input placeholder='1' value={inputValue} onChange={handleChange} />
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
