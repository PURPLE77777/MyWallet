import { useRoute } from '@react-navigation/native'
import { Text, View } from 'react-native'

import Layout from '@ui/layout/Layout'

const ProfileScreen = () => {
	const route = useRoute()

	return (
		<Layout title={route.name}>
			<View>
				{/* <Carousel data={products} /> */}
				<Text className='text-red-600'>{route.name}</Text>
			</View>
		</Layout>
	)
}

export default ProfileScreen
