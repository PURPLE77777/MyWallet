import { useRoute } from '@react-navigation/native'
import { View } from 'react-native'

import Layout from '@ui/layout/Layout'

import Carousel from './components/Carousel'
import LastTransactions from './components/LastTransactions'

const WalletsScreen = () => {
	const route = useRoute()

	return (
		<Layout title={route.name}>
			<View>
				<Carousel />
				<LastTransactions />
			</View>
		</Layout>
	)
}

export default WalletsScreen
