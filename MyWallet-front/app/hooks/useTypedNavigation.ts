import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { RootStackParamList } from '@navigation/navigation.types'

type NavigationType = NativeStackNavigationProp<
	RootStackParamList,
	keyof RootStackParamList
>

export const useTypedNavigation = () => useNavigation<NavigationType>()
