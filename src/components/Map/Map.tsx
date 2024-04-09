import {
	Circle,
	GoogleMap,
	Marker,
	useJsApiLoader,
} from '@react-google-maps/api'

import { LocateFixed } from 'lucide-react'

import MainButton from '../UI/MainButton/MainButton'

import { defaultOptions } from './defaultOptions'

import { usePlaces } from '@/hooks/dashboard/usePlaces'
import { useUserPosition } from '@/hooks/dashboard/useUserPosition'
import { RootState } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Map.module.scss'

import { fetchPlaceDetails } from '@/hooks/dashboard/usePlaceDetails'
import { togglePlace } from '@/store/slices/dashboardSlice'
import { selectSelectedPlace } from '@/store/slices/placeSlice'
import { useEffect, useState } from 'react'
import { icons } from './utils'

const { VITE_GOOGLE_KEY } = import.meta.env

interface PlaceProps {
	setPlaceDetails: (newValue: any) => void
}

const Map = ({ setPlaceDetails }: PlaceProps) => {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: VITE_GOOGLE_KEY,
	})

	const radius = useSelector(
		(state: RootState) => state.radiusSlice.radiusSlice
	)
	const defaultUserPosition = { lat: 53.9007, lng: 27.5709 }
	const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
		lat: 53.9007,
		lng: 27.5709,
	})
	const { userPosition, getUserPosition } = useUserPosition({ setMapCenter })

	const places = usePlaces({
		userPosition: userPosition || defaultUserPosition,
	})

	const [circleRadius, setCircleRadius] = useState<number | undefined>(
		undefined
	)

	useEffect(() => {
		setCircleRadius(radius !== 0 ? radius : undefined)
	}, [radius])

	const dispatch = useDispatch()

	const handleTogglePlace = () => {
		dispatch(togglePlace())
	}

	const handleMarkerClick = async (placeId: string) => {
		const details = await fetchPlaceDetails(placeId, VITE_GOOGLE_KEY)
		setPlaceDetails(details)
		handleTogglePlace()
	}

	const selectedPlace = useSelector(selectSelectedPlace)

	useEffect(() => {
		if (selectedPlace) {
			setMapCenter({
				lat: selectedPlace.location.lat,
				lng: selectedPlace.location.lng,
			})
		}
	}, [selectedPlace])

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
						radius={circleRadius}
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
					<Marker
						position={userPosition}
						icon={{
							url: '../../../public/userMarker.png',
							scaledSize: new window.google.maps.Size(25, 20),
						}}
					/>
				</>
			)}

			{userPosition &&
				places.map((place: any) => {
					const iconUrl = icons[place.types.find((type: string) => icons[type])]
					return (
						<Marker
							key={place.place_id}
							position={{
								lat: place.geometry.location.lat,
								lng: place.geometry.location.lng,
							}}
							title={place.name}
							icon={{
								url: iconUrl ? iconUrl : '',
								scaledSize: new window.google.maps.Size(30, 30),
							}}
							onClick={() => handleMarkerClick(place.place_id)}
						/>
					)
				})}
		</GoogleMap>
	) : null
}
export default Map
