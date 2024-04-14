import { ILocation } from '@/hooks/dashboard/types'
import { Marker } from '@react-google-maps/api'
import { FC } from 'react'
import { icons } from '../iconName'

interface RenderPlaceMarkersProps {
	places: ILocation[]
	handleMarkerClick: (placeId: string) => void
}

const RenderPlaceMarkers: FC<RenderPlaceMarkersProps> = ({
	places,
	handleMarkerClick,
}) => {
	return (
		<>
			{places.map((place: ILocation) => {
				const foundType = place.types.find((type: string) => icons[type])
				const iconUrl = foundType ? icons[foundType] : undefined
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
		</>
	)
}

export default RenderPlaceMarkers
