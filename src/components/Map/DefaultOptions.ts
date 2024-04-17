import { defaultTheme } from './DefaultTheme'

export const defaultOptions = {
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
