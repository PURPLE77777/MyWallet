import * as Font from 'expo-font'

export const useFonts = async () =>
	await Font.loadAsync({
		'Comfortaa-Regular': require('../assets/fonts/Comfortaa-Regular.ttf'),
		'Comfortaa-Light': require('../assets/fonts/Comfortaa-Light.ttf'),
		'Comfortaa-Medium': require('../assets/fonts/Comfortaa-Medium.ttf'),
		'Comfortaa-SemiBold': require('../assets/fonts/Comfortaa-SemiBold.ttf'),
		'Comfortaa-Bold': require('../assets/fonts/Comfortaa-Bold.ttf')
	})
