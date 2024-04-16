import { useState } from 'react'

const GeoLocationButton = () => {
	const [errorMessage, setErrorMessage] = useState('')

	const handleGetGeoLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				position => {
					const { latitude, longitude } = position.coords
					console.log('Current coordinates:', latitude, longitude)
					setErrorMessage('')
				},
				error => {
					console.error('Error getting user position:', error)
					setErrorMessage(
						'Please enable location access in your browser settings.'
					)
				}
			)
		} else {
			setErrorMessage('Geolocation is not supported by this browser.')
		}
	}

	return (
		<div>
			<button onClick={handleGetGeoLocation}>Get My Location</button>
			{errorMessage && <p>{errorMessage}</p>}
		</div>
	)
}

export default GeoLocationButton
