import {
	Circle,
	GoogleMap,
	Marker,
	useJsApiLoader,
} from '@react-google-maps/api'

import { LocateFixed } from 'lucide-react'

import userMarker from '../../../public/userMarker.png'
import MainButton from '../UI/MainButton/MainButton'

import { defaultOptions } from './defaultOptions'

import { usePlaces } from '@/hooks/dashboard/usePlaces'
import { useUserPosition } from '@/hooks/dashboard/useUserPosition'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'
import styles from './Map.module.scss'

const icons: Record<string, string> = {
	food: '/public/ico/food.png',
	university: '/public/ico/factory.png',
	store: '/public/ico/solar_shop.png',
	finance: '/public/ico/bank.png',
	point_of_interest: '/public/ico/culture.png',
}

const { VITE_GOOGLE_KEY } = import.meta.env

const Map = () => {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: VITE_GOOGLE_KEY,
	})

	const userPosition = useUserPosition()
	const places = usePlaces()

	const radius = useSelector(
		(state: RootState) => state.radiusSlice.radiusSlice
	)

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={{ width: '100%', height: '100%' }}
			zoom={14}
			center={userPosition || { lat: 53.89166, lng: 30.3418 }}
			options={defaultOptions}
		>
			{userPosition && (
				<>
					<div className={styles.wrapper}>
						<MainButton svg={<LocateFixed />} />
					</div>

					<Marker
						position={userPosition}
						icon={{
							url: userMarker,
							size: new window.google.maps.Size(30, 25),
						}}
						options={{ optimized: false }}
					/>
					<Circle
						center={userPosition}
						radius={radius}
						options={{
							strokeColor: '#5E7BC7',
							strokeOpacity: 1,
							strokeWeight: 2,
							fillColor: '#5E7BC7',
							fillOpacity: 0.3,
						}}
					/>

					{places.map((place: any) => (
						<Marker
							key={place.name}
							position={{
								lat: place.geometry.location.lat,
								lng: place.geometry.location.lng,
							}}
							title={place.name}
							icon={{
								url: icons[place.types.find((type: string) => icons[type])],
								scaledSize: new window.google.maps.Size(40, 40),
							}}
						/>
					))}
				</>
			)}
		</GoogleMap>
	) : null
}

export default Map
