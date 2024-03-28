import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import { useCallback, useEffect, useState } from 'react'

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
	styles: defaultTheme,
}

const Map = () => {
	const { isLoaded, loadError } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: 'AIzaSyAmbnbX7QWlEA41SlYMxemJCSzx7MA_7-I',
	})

	const [map, setMap] = useState(null)

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
	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={containerStyle}
			zoom={14}
			center={{ lat: 53.89166, lng: 30.3418 }}
			onLoad={onLoad}
			onUnmount={onUnmount}
			options={defaultOptions}
		>
			<></>
		</GoogleMap>
	) : null
}

export default Map
