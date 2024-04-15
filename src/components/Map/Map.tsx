import { Circle, GoogleMap, Marker, Polyline } from '@react-google-maps/api'
import { LocateFixed } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'

import { useMapCenterEffect } from '@/hooks/dashboard/useMapCenterEffect'
import { usePlaces } from '@/hooks/dashboard/usePlaces'
import { useRouteEffect } from '@/hooks/dashboard/useRouteEffect'
import { useUserPosition } from '@/hooks/dashboard/useUserPosition'
import { selectSelectedPlace } from '@/store/slices/placeSlice'
import { RootState } from '@/store/store'

import MainButton from '../UI/MainButton/MainButton'
import RenderPlaceMarkers from './RenderPlaceMarkers/RenderPlaceMarkers'
import UserMarker from './UserMarker/UserMarker'
import { defaultOptions } from './defaultOptions'
import {
	googleMapsLoader,
	useCircleRedraw,
	useHandleMarkerClick,
} from './utils'

import styles from './Map.module.scss'

const { VITE_GOOGLE_KEY } = import.meta.env

interface PlaceProps {
	destination: { lat: number; lng: number } | null
}

const Map = ({ destination }: PlaceProps) => {
	const { isLoaded } = googleMapsLoader(VITE_GOOGLE_KEY)
	const mapRef = useRef<google.maps.Map | null>(null)

	const radius = useSelector(
		(state: RootState) => state.radiusSlice.radiusSlice
	)
	const route = useSelector((state: RootState) => state.distance.route)
	const selectedPlace = useSelector(selectSelectedPlace)

	const isWindowOpen = useSelector(
		(state: RootState) => state.distance.isWindowOpen
	)

	const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
		lat: 53.9007,
		lng: 27.5709,
	})

	const { userPosition, getUserPosition } = useUserPosition({ setMapCenter })
	const places = usePlaces({
		lat: userPosition?.lat || 53.9007,
		lng: userPosition?.lng || 27.5709,
	})
	const handleMarkerClick = useHandleMarkerClick()
	useMapCenterEffect(selectedPlace, setMapCenter)

	const circleRef = useRef<any>(null)
	const polylineRef = useRef<any>(null)

	useCircleRedraw({ circleRef, userPosition, mapRef, radius })

	useRouteEffect(destination, userPosition, polylineRef)

	useEffect(() => {
		if (polylineRef.current && polylineRef.current.setMap) {
			polylineRef.current.setMap(null)
			polylineRef.current = null
		}

		if (isWindowOpen && route) {
			const newPolyline = new google.maps.Polyline({
				path: route.overview_path,
				strokeColor: '#FF0000',
				strokeOpacity: 1,
				strokeWeight: 2,
				map: mapRef.current,
			})
			polylineRef.current = newPolyline
		}
	}, [isWindowOpen, route])

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={{ width: '100%', height: '100%' }}
			zoom={14}
			center={mapCenter}
			options={defaultOptions}
			onLoad={map => {
				mapRef.current = map
			}}
		>
			<div className={styles.wrapper}>
				<MainButton svg={<LocateFixed />} onClick={getUserPosition} />
			</div>

			{selectedPlace && (
				<Marker
					position={{
						lat: selectedPlace.location.lat,
						lng: selectedPlace.location.lng,
					}}
					title={selectedPlace.name}
					onClick={() => {
						handleMarkerClick(selectedPlace.place_id)
					}}
				/>
			)}

			{userPosition && (
				<>
					<Circle ref={circleRef} />
					<UserMarker userPosition={userPosition} />
				</>
			)}

			{userPosition && <RenderPlaceMarkers places={places} />}

			{route && <Polyline ref={polylineRef} />}
		</GoogleMap>
	) : null
}
export default Map
