import { Autocomplete } from '@react-google-maps/api'
import classNames from 'classnames'
import { ChevronLeft } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'

import useAutocomplete from '@/Hooks/dashboard/Search/useAutocomplete'
import useItemSelection from '@/Hooks/dashboard/Search/useItemSelection'
import useRadiusInput from '@/Hooks/dashboard/Search/useRadiusInput'

import { toggleSearch } from '@/Store/Slices/DashboardSlice'
import { RootState } from '@/Store/Store'

import usePlaceSelection from '@/Hooks/dashboard/Search/usePlaceSelection'
import Input from '../UI/Input/Input'
import Item from './Item/Item'
import { data } from './Search.data'
import styles from './Search.module.scss'

const Search = () => {
	const dispatch = useDispatch()

	const { isSearchOpen } = useSelector((state: RootState) => state.dashboard)
	const handleToggleSearch = () => {
		dispatch(toggleSearch())
	}

	const { autocomplete, onLoad } = useAutocomplete()
	const { handleItemClick } = useItemSelection()
	const { inputValue, handleChange } = useRadiusInput()
	const { handlePlaceSelect } = usePlaceSelection(autocomplete)

	return (
		<section
			className={classNames(styles.search, {
				[styles.open]: isSearchOpen,
			})}
		>
			<div className={styles.main}>
				<div className={styles.input}>
					<Autocomplete onLoad={onLoad} onPlaceChanged={handlePlaceSelect}>
						<Input placeholder='Место, адрес..' />
					</Autocomplete>
				</div>

				<div className={styles.title}>Искать:</div>

				<div className={styles.wrapper}>
					{data.map(item => (
						<Item
							key={item.id}
							name={item.name}
							img={item.img}
							onClick={() => handleItemClick(item)}
						/>
					))}
				</div>

				<div className={styles.title}>В радиусе</div>
				<div className={styles.inputKM}>
					<Input placeholder='1' value={inputValue} onChange={handleChange} />
					<span>км</span>
				</div>
			</div>

			<button className={styles.close} onClick={handleToggleSearch}>
				<ChevronLeft />
			</button>
		</section>
	)
}

export default Search
