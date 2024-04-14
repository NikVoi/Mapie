import { Circle, GoogleMap, Marker, Polyline } from '@react-google-maps/api'
import { LocateFixed } from 'lucide-react'
import { useState } from 'react'
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
import { googleMapsLoader, useHandleMarkerClick } from './utils'

import styles from './Map.module.scss'

const { VITE_GOOGLE_KEY } = import.meta.env

interface PlaceProps {
	destination: { lat: number; lng: number } | null
}

const Map = ({ destination }: PlaceProps) => {
	const { isLoaded } = googleMapsLoader(VITE_GOOGLE_KEY)

	const radius = useSelector(
		(state: RootState) => state.radiusSlice.radiusSlice
	)
	const route = useSelector((state: RootState) => state.distance.route)
	const selectedPlace = useSelector(selectSelectedPlace)

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
	useRouteEffect(destination, userPosition)

	return isLoaded ? (
		<GoogleMap
			mapContainerStyle={{ width: '100%', height: '100%' }}
			zoom={14}
			center={mapCenter}
			options={defaultOptions}
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
					onClick={() => handleMarkerClick(selectedPlace.place_id)}
				/>
			)}

			{userPosition && (
				<>
					<Circle
						center={userPosition}
						radius={radius}
						options={{
							center: userPosition,
							radius: radius,
							strokeColor: '#5E7BC7',
							strokeOpacity: 1,
							strokeWeight: 2,
							fillColor: '#5E7BC7',
							fillOpacity: 0.3,
						}}
					/>
					<UserMarker userPosition={userPosition} />
				</>
			)}

			{userPosition && (
				<RenderPlaceMarkers
					places={places}
					handleMarkerClick={() => handleMarkerClick(selectedPlace.place_id)}
				/>
			)}

			{route && (
				<Polyline
					key={route}
					path={route.overview_path}
					options={{ strokeColor: '#FF0000' }}
				/>
			)}
		</GoogleMap>
	) : null
}
export default Map
