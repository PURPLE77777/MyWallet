import { useRoute } from '@react-navigation/native'
import { useAuth } from 'hooks/useAuth'
import { View, Text } from 'react-native'

const Navigations = () => {
	const { user } = useAuth()

	const nav = useRoute()
	console.log(nav.name)
	return (
		<View>
			<Text>Navigations</Text>
		</View>
	)
}

export default Navigations
