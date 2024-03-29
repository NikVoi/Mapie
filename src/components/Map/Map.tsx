import styles from './Map.module.scss'

import {
	Circle,
	GoogleMap,
	Marker,
	useJsApiLoader,
} from '@react-google-maps/api'
import { useEffect, useState } from 'react'

import { LocateFixed } from 'lucide-react'
import shop from '../../../public/ico/nature.svg'
import userMarker from '../../../public/userMarker.png'
import MainButton from '../UI/MainButton/MainButton'
import { defaultTheme } from './defaultTheme'

const defaultOptions = {
	panControl: true,
	zoomControl: true,
	mapTypeControl: false,
	scaleControl: true,
	streetViewControl: false,
	rotateControl: false,
	clickableIcons: true,
	scrollWheel: true,
	disableDoubleClickZoom: true,
	styles: defaultTheme.map(style => ({
		featureType: style.featureType,
		elementType: style.elementType,
		stylers: style.stylers || [],
	})),
}

const { VITE_GOOGLE_KEY } = import.meta.env

interface UserPosition {
	lat: number
	lng: number
}

const Map = () => {
	const { isLoaded, loadError } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: VITE_GOOGLE_KEY,
	})

	const [userPosition, setUserPosition] = useState<UserPosition | null>(null)
	const [circleRadius] = useState(1000)
	const [places, setPlaces] = useState<
		{ id: number; name: string; location: { lat: number; lng: number } }[]
	>([])

	const getUserPosition = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					setUserPosition({
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					})
				},
				error => {
					console.error('Error getting user position:', error)
				}
			)
		} else {
			console.error('Geolocation is not supported by this browser.')
		}
	}

	useEffect(() => {
		getUserPosition()
	}, [])

	const isPlaceInsideCircle = (
		place: { location: UserPosition },
		center: UserPosition,
		radius: number
	): boolean => {
		if (
			!window.google ||
			!window.google.maps ||
			!window.google.maps.geometry ||
			!window.google.maps.geometry.spherical
		) {
			console.error(
				'Google Maps API is not loaded or spherical geometry is not available.'
			)
			return false
		}

		const distanceInMeters: number =
			window.google.maps.geometry.spherical.computeDistanceBetween(
				new window.google.maps.LatLng(place.location.lat, place.location.lng),
				new window.google.maps.LatLng(center.lat, center.lng)
			)
		return distanceInMeters <= radius
	}

	useEffect(() => {
		if (userPosition !== null) {
			// Ваш код для загрузки мест с сервера или из другого источника данных
			const dummyPlaces = [
				{ id: 1, name: 'Место 1', location: { lat: 53.905, lng: 30.315 } },
				{ id: 2, name: 'Место 2', location: { lat: 53.91, lng: 30.305 } },
				// Добавьте другие места по вашему усмотрению
			]

			// Отфильтровываем места, которые находятся внутри круга
			const placesInsideCircle = dummyPlaces.filter(place =>
				isPlaceInsideCircle(place, userPosition, circleRadius)
			)

			// Устанавливаем отфильтрованные места в состояние
			setPlaces(placesInsideCircle)
		}
	}, [userPosition, circleRadius])

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
						<MainButton svg={<LocateFixed />} onClick={getUserPosition} />
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
						radius={circleRadius}
						options={{
							strokeColor: '#5E7BC7',
							strokeOpacity: 1,
							strokeWeight: 2,
							fillColor: '#5E7BC7',
							fillOpacity: 0.3,
						}}
					/>

					{places.map(place => (
						<Marker
							key={place.id}
							position={place.location}
							icon={{
								url: shop,
								scaledSize: new window.google.maps.Size(30, 25),
							}}
							options={{ optimized: false }}
							title={place.name}
						/>
					))}
				</>
			)}
		</GoogleMap>
	) : null
}

export default Map
