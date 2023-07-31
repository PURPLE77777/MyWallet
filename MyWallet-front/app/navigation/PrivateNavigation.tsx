import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { FC } from 'react'

import { useAuth } from '@hooks/useAuth'

import { RootStackParamList } from './navigation.types'
import { routes } from './routes'

const Stack = createNativeStackNavigator<RootStackParamList>()

const PrivateNavigation: FC = () => {
	const { user } = useAuth()
	return (
		<Stack.Navigator>
			{routes.map(route => (
				<Stack.Screen
					name={route.name}
					component={route.component}
					key={route.name}
				/>
			))}
		</Stack.Navigator>
	)
}

export default PrivateNavigation
