import { useRoute } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FC } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

import { RootStackParamList } from '@navigation/navigation.types'

import { useActions } from '@hooks/useActions'
import { useAuth } from '@hooks/useAuth'

import Button from '@ui/button/Button'
import Layout from '@ui/layout/Layout'

type ProfileType = NativeStackScreenProps<RootStackParamList, 'Profile'>

const ProfileScreen: FC<ProfileType> = ({ navigation: { navigate } }) => {
	const route = useRoute()
	const { user } = useAuth()

	const { logout, clearWallets } = useActions()
	// console.log(user)
	return (
		<Layout title={route.name}>
			<View className='h-full items-center justify-center'>
				{/* <Carousel data={products} /> */}
				<Text className='text-red-600'>{route.name}</Text>
				<Text>{user?.name}</Text>
				<TouchableOpacity
					className='rounded-md bg-primaryPurple p-4'
					onPress={() => {
						logout()
					}}
				>
					<Text className='text-white'>Logout</Text>
				</TouchableOpacity>
				<TouchableOpacity
					className='rounded-md bg-primaryPurple p-4'
					onPress={() => {
						clearWallets()
					}}
				>
					<Text className='text-white'>clearWallets</Text>
				</TouchableOpacity>
				<Button text='Add wallet' onPress={() => navigate('ReviewWallet')} />
			</View>
		</Layout>
	)
}

export default ProfileScreen
