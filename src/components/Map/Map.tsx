import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'

import { LocateFixed } from 'lucide-react'

import MainButton from '../UI/MainButton/MainButton'

import { defaultOptions } from './defaultOptions'

import { usePlaces } from '@/hooks/dashboard/usePlaces'
import { useUserPosition } from '@/hooks/dashboard/useUserPosition'
import { RootState } from '@/store/store'
import { useSelector } from 'react-redux'
import styles from './Map.module.scss'

import useMapFeatures from '@/hooks/dashboard/useMapFeatures'
import userMarkerUrl from '../../../public/userMarker.png'

const icons: Record<string, string> = {
	park: './ico/nature.png',
	church: './ico/religion.png',
	amusement_park: './ico/ferris.png',
	food: './ico/food.png',
	university: './ico/culture.png',
	furniture_store: './ico/solar_shop.png',
	store: './ico/solar_shop.png',
	finance: './ico/bank.png',
	establishment: './ico/culture.png',
	night_club: './ico/18+.png',
	train_station: './ico/factory.png',
}

const { VITE_GOOGLE_KEY } = import.meta.env

const Map = () => {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: VITE_GOOGLE_KEY,
	})

	const radius = useSelector(
		(state: RootState) => state.radiusSlice.radiusSlice
	)
	const { userPosition, getUserPosition } = useUserPosition()
	const places = usePlaces()
	const { circle, userMarker, map, handleMapLoad } = useMapFeatures(
		isLoaded,
		userPosition,
		radius,
		places,
		userMarkerUrl
	)

	return isLoaded ? (
		<GoogleMap
			onLoad={handleMapLoad}
			mapContainerStyle={{ width: '100%', height: '100%' }}
			zoom={14}
			center={userPosition || { lat: 53.89166, lng: 30.3418 }}
			options={defaultOptions}
		>
			<div className={styles.wrapper}>
				<MainButton svg={<LocateFixed />} onClick={getUserPosition} />
			</div>
			{userPosition &&
				places.map((place: any) => (
					<Marker
						key={place.name}
						position={{
							lat: place.geometry.location.lat,
							lng: place.geometry.location.lng,
						}}
						title={place.name}
						icon={{
							url: icons[place.types.find((type: string) => icons[type])],
							scaledSize: new window.google.maps.Size(30, 30),
						}}
					/>
				))}
		</GoogleMap>
	) : null
}

export default Map
