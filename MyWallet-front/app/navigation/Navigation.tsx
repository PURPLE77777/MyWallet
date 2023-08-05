import {
	NavigationContainer,
	useNavigationContainerRef
} from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { ActivityIndicator, Text, View } from 'react-native'

import { COLORS } from '@constants/colors.constants'

import { useFonts } from '@hooks/useFonts'

import BottomMenu from '@ui/bottom-menu/BottomMenu'

import PrivateNavigation from './PrivateNavigation'

const Navigation = () => {
	const [isFontLoaded, setIsFontLoaded] = useState(false)
	const [currentRoute, setCurrentRoute] = useState<string | undefined>(
		undefined
	)

	const navigation = useNavigationContainerRef()

	useEffect(() => {
		async function loadFonts() {
			try {
				await useFonts()
				await new Promise(resolve => setTimeout(resolve, 2000))
			} catch (e) {
				console.warn(e)
			} finally {
				setIsFontLoaded(true)
			}
		}

		loadFonts()
	}, [])

	useEffect(() => {
		setCurrentRoute(navigation.getCurrentRoute()?.name)

		const navListener = navigation.addListener('state', () => {
			setCurrentRoute(navigation.getCurrentRoute()?.name)
		})

		return () => {
			navigation.removeListener('state', navListener)
		}
	})

	if (!isFontLoaded) {
		return (
			<View className='flex-1 items-center justify-center bg-primaryLightGray'>
				<ActivityIndicator
					animating={isFontLoaded}
					size='large'
					color={COLORS.primaryPurple}
				/>
				<Text className='text-3xl text-white'>Loading...</Text>
			</View>
		)
	}

	return (
		<>
			<NavigationContainer ref={navigation}>
				<PrivateNavigation />
			</NavigationContainer>

			{currentRoute && (
				<BottomMenu
					navigate={navigation.navigate}
					currentRoute={currentRoute}
				/>
			)}
		</>
	)
}

export default Navigation
