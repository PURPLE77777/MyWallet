import { NavigationContainer } from '@react-navigation/native'

import PrivateNavigation from './PrivateNavigation'

const Navigation = () => {
	// const nav = useRoute()
	// console.log(nav.name)
	return (
		<NavigationContainer>
			<PrivateNavigation />
		</NavigationContainer>
	)
}

export default Navigation
