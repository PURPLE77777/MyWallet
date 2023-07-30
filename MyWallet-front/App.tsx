import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Settings, Text, View } from 'react-native'
import SettingsScreen from './app/screens/settings/SettingsScreen'

export default function App() {
	const Stack = createNativeStackNavigator()

	return (
		<NavigationContainer>
		<Stack.Navigator
			initialRouteName='Main'
			screenOptions={{
				// headerShown: false,
				headerTintColor: 'white',
				headerStyle: {
					backgroundColor: '#5B04AC'
				}
			}}
		>
			<Stack.Screen name='Settings' component={SettingsScreen} />
			<Stack.Screen
				name='Main'
				component={MainScreen}
				// options={{ headerShown: false }}
			/>

			<Stack.Screen name='AddAccount' component={AddAccountScreen} />
		</Stack.Navigator>
	</NavigationContainer>
	)
}
