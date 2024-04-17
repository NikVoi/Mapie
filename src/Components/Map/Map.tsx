import { Circle, GoogleMap, Marker, Polyline } from '@react-google-maps/api'
import { LocateFixed } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useMapCenterEffect } from '@/Hooks/Dashboard/useMapCenterEffect'
import { useRouteEffect } from '@/Hooks/Dashboard/useRouteEffect'
import { useUserPosition } from '@/Hooks/Dashboard/useUserPosition'
import {
	clearSelectedPlace,
	selectSelectedPlace,
} from '@/Store/Slices/PlaceSlice'
import { RootState } from '@/Store/Store'

import MainButton from '@Components/UI/MainButton/MainButton'

import RenderPlaceMarkers from './RenderPlaceMarkers/RenderPlaceMarkers'
import UserMarker from './UserMarker/UserMarker'
import {
	googleMapsLoader,
	useCircleRedraw,
	useHandleMarkerClick,
} from './Utils'

import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from '@/Constant/Position'
import { usePlaces } from '@/Hooks/Dashboard/usePlaces'
import { defaultOptions } from './DefaultOptions'
import styles from './Map.module.scss'

const { VITE_GOOGLE_KEY } = import.meta.env

interface PlaceProps {
	destination: { lat: number; lng: number } | null
}

const Map = ({ destination }: PlaceProps) => {
	const dispatch = useDispatch()
	const { isLoaded } = googleMapsLoader(VITE_GOOGLE_KEY)

	const [isPolylineRendered, setIsPolylineRendered] = useState(false)

	const mapRef = useRef<google.maps.Map | null>(null)
	const circleRef = useRef<any>(null)
	const polylineRef = useRef<any>(null)

	const radius = useSelector(
		(state: RootState) => state.radiusSlice.radiusSlice
	)
	const route = useSelector((state: RootState) => state.distance.route)
	const selectedPlace = useSelector(selectSelectedPlace)

	const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
		lat: DEFAULT_LATITUDE,
		lng: DEFAULT_LONGITUDE,
	})

	const { userPosition, getUserPosition } = useUserPosition({ setMapCenter })

	const [mainPos, setMainPos] = useState<{
		lat: number
		lng: number
	} | null>(null)

	useEffect(() => {
		if (userPosition !== null) {
			setMainPos({
				lat: userPosition.lat,
				lng: userPosition.lng,
			})
		}
	}, [userPosition])

	const handleMarkerClick = useHandleMarkerClick()
	useMapCenterEffect(selectedPlace, setMapCenter)

	const { redrawWithNewPosition, drawCircle } = useCircleRedraw({
		circleRef,
		mapRef,
		position: userPosition,
		radius,
	})

	const places = usePlaces({
		lat: mainPos?.lat || DEFAULT_LATITUDE,
		lng: mainPos?.lng || DEFAULT_LONGITUDE,
	})

	useEffect(() => {
		if (userPosition !== null) {
			setMainPos({
				lat: userPosition.lat,
				lng: userPosition.lng,
			})
		}
	}, [userPosition])

	useEffect(() => {
		if (selectedPlace) {
			setMainPos({
				lat: selectedPlace.location.lat,
				lng: selectedPlace.location.lng,
			})
		}
	}, [selectedPlace])

	useRouteEffect(
		destination,
		userPosition,
		polylineRef,
		mapRef,
		setIsPolylineRendered,
		route
	)

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
				<MainButton
					svg={<LocateFixed />}
					onClick={() => {
						drawCircle(userPosition)
						getUserPosition()
						dispatch(clearSelectedPlace())
					}}
				/>
			</div>

			<Circle ref={circleRef} />

			{userPosition && <UserMarker userPosition={userPosition} />}

			{selectedPlace && (
				<>
					{redrawWithNewPosition(selectedPlace.location)}

					<Marker
						position={{
							lat: selectedPlace.location.lat,
							lng: selectedPlace.location.lng,
						}}
						onClick={() => handleMarkerClick(selectedPlace.place_id)}
					/>
				</>
			)}

			{userPosition && <RenderPlaceMarkers places={places} />}

			{isPolylineRendered || <Polyline ref={polylineRef} />}
		</GoogleMap>
	) : null
}
export default Map
