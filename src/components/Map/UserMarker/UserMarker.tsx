import { IPosition } from '@/types/types'
import { Marker } from '@react-google-maps/api'

const UserMarker = ({ userPosition }: { userPosition: IPosition }) => (
	<Marker
		position={userPosition}
		icon={{
			url: '../../../public/userMarker.png',
			scaledSize: new window.google.maps.Size(25, 20),
		}}
	/>
)

export default UserMarker
