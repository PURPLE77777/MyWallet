import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FC } from 'react'

import { COLORS } from '@constants/colors.constants'

import AuthScreen from '@screens/auth/AuthScreen'

import { useAuth } from '@hooks/useAuth'

import { RootStackParamList } from './navigation.types'
import { routes } from './routes'

const Stack = createNativeStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator<Omit<RootStackParamList, 'Auth'>>()

const PrivateNavigation: FC = () => {
	const { user } = useAuth()
	return (
		<Stack.Navigator
			// initialRouteName='Wallets'
			screenOptions={{
				animation: 'none',
				headerStyle: { backgroundColor: COLORS.primaryDarkGray },
				headerShown: false
				// statusBarColor: ''
			}}
		>
			{user ? (
				// <Tab.Navigator
				// 	initialRouteName='Wallets'
				// 	// tabBar={BottomMenu}
				// 	screenOptions={{
				// 		tabBarButton: props => <TouchableHighlight {...props}></TouchableHighlight>,
				// 		tabBarIcon: () => <></>
				// 	}}
				// >
				// 	{routes.map(route => (
				// 		<Tab.Screen
				// 			name={route.name}
				// 			component={route.component}
				// 			key={route.name}
				// 		/>
				// 	))}
				// </Tab.Navigator>
				routes.map(route => (
					<Tab.Screen
						name={route.name}
						component={route.component}
						key={route.name}
					/>
				))
			) : (
				<Stack.Screen
					name='Auth'
					component={AuthScreen}
					options={{ headerShown: false }}
				/>
			)}
		</Stack.Navigator>
	)
}

export default PrivateNavigation
