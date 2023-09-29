import { useRoute } from '@react-navigation/native'
import { Text, TouchableOpacity, View } from 'react-native'

import { useActions } from '@hooks/useActions'
import { useAuth } from '@hooks/useAuth'

import Layout from '@ui/layout/Layout'

const ProfileScreen = () => {
	const route = useRoute()
	const { user } = useAuth()

	const { logout } = useActions()
	console.log(user)
	return (
		<Layout title={route.name}>
			<View className='h-full items-center justify-center'>
				{/* <Carousel data={products} /> */}
				<Text className='text-red-600'>{route.name}</Text>
				<Text>{user?.name}</Text>
				<TouchableOpacity
					className='rounded-md bg-primaryPurple p-4'
					onPress={() => logout()}
				>
					<Text className='text-white'>Logout</Text>
				</TouchableOpacity>
			</View>
		</Layout>
	)
}

export default ProfileScreen
