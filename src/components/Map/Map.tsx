import styles from './Map.module.scss'

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { useCallback, useEffect, useState } from 'react'

import { LocateFixed } from 'lucide-react'
import userMarker from '../../../public/userMarker.png'
import MainButton from '../UI/MainButton/MainButton'
import { defaultTheme } from './defaultTheme'

const containerStyle = {
	width: '100%',
	height: '100%',
}

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

	const [map, setMap] = useState(null)
	const [userPosition, setUserPosition] = useState<UserPosition | null>(null)

	const func = () => {
		map
	}

	console.log(func)

	useEffect(() => {
		if (loadError) {
			console.error('Error loading Google Maps API:', loadError)
		}
	}, [loadError])

	const onLoad = useCallback(function callback(mapInstance: any) {
		setMap(mapInstance)
	}, [])

	const onUnmount = useCallback(function callback() {
		setMap(null)
	}, [])

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

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			zoom={14}
			center={userPosition || { lat: 53.89166, lng: 30.3418 }}
			onLoad={onLoad}
			onUnmount={onUnmount}
			options={defaultOptions}
		>
			<div className={styles.wrapper}>
				<MainButton svg={<LocateFixed />} onClick={getUserPosition} />
			</div>
			{userPosition && (
				<Marker position={userPosition} icon={{ url: userMarker }} />
			)}
		</GoogleMap>
	) : null
}

export default Map
