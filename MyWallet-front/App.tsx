import { SafeAreaProvider } from 'react-native-safe-area-context'

import Navigation from '@navigation/Navigation'

import AuthProvider from '@providers/auth/AuthProvider'

export default function App() {
	return (
		<SafeAreaProvider>
			<AuthProvider>
				<Navigation />
			</AuthProvider>
			{/* <StatusBar style='dark' translucent={true} hidden={false} /> */}
		</SafeAreaProvider>
		// 	<NavigationContainer>
		// 	<Stack.Navigator
		// 		initialRouteName='Main'
		// 		screenOptions={{
		// 			// headerShown: false,
		// 			headerTintColor: 'white',
		// 			headerStyle: {
		// 				backgroundColor: '#5B04AC'
		// 			}
		// 		}}
		// 	>
		// 		<Stack.Screen name='Settings' component={SettingsScreen} />
		// 		<Stack.Screen
		// 			name='Main'
		// 			component={MainScreen}
		// 			// options={{ headerShown: false }}
		// 		/>

		// 		<Stack.Screen name='AddAccount' component={AddAccountScreen} />
		// 	</Stack.Navigator>
		// </NavigationContainer>
	)
}
