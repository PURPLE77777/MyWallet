import {
	NavigationContainer,
	useNavigationContainerRef
} from '@react-navigation/native'
// import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Image, Text, View } from 'react-native'

import { COLORS } from '@constants/colors.constants'

import { useAuth } from '@hooks/useAuth'
import { useFonts } from '@hooks/useFonts'

import BottomMenu from '@ui/bottom-menu/BottomMenu'

import PrivateNavigation from './PrivateNavigation'

const Navigation = () => {
	const [isFontLoaded, setIsFontLoaded] = useState(false)
	const [currentRoute, setCurrentRoute] = useState<string | undefined>(
		undefined
	)

	const { user } = useAuth()

	const navigation = useNavigationContainerRef()

	useEffect(() => {
		const loadFonts = async () => {
			// await SplashScreen.preventAutoHideAsync()
			try {
				await useFonts()
				await new Promise(resolve => setTimeout(resolve, 1000))
			} catch (e) {
				console.warn(e)
			} finally {
				setIsFontLoaded(true)
				// await SplashScreen.hideAsync()
			}
		}

		loadFonts()
	}, [])

	const updateRoute = () => {
		setCurrentRoute(navigation.getCurrentRoute()?.name)
	}

	if (!isFontLoaded) {
		return (
			// null for Splash screen
			<View className='flex-1 items-center justify-center bg-primaryLightGray'>
				<Text className='text-3xl text-white'>Loading...</Text>
				<ActivityIndicator
					animating={!isFontLoaded} //
					size='large'
					color={COLORS.primaryPurple}
				/>
				<Image source={require('../assets/images/wallet.gif')} />
			</View>
		)
	}

	return (
		<>
			<NavigationContainer
				ref={navigation}
				onReady={updateRoute}
				onStateChange={updateRoute}
			>
				<PrivateNavigation />
			</NavigationContainer>

			{currentRoute && user && (
				<BottomMenu
					navigate={navigation.navigate}
					currentRoute={currentRoute}
				/>
			)}
		</>
	)
}

export default Navigation
