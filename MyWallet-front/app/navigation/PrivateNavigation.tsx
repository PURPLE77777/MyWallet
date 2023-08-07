import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FC } from 'react'

import { COLORS } from '@constants/colors.constants'

import AuthScreen from '@screens/auth/AuthScreen'

import { useAuth } from '@hooks/useAuth'

import { RootStackParamList } from './navigation.types'
import { routes } from './routes'

const Stack = createNativeStackNavigator<RootStackParamList>()

const PrivateNavigation: FC = () => {
	const { user } = useAuth()
	return (
		<Stack.Navigator
			screenOptions={{
				animation: 'none',
				headerStyle: { backgroundColor: COLORS.primaryDarkGray },
				headerShown: false
				// statusBarColor: ''
			}}
		>
			{true ? (
				routes.map(route => (
					<Stack.Screen
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
