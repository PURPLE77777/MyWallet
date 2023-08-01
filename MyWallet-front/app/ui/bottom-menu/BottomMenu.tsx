import { View } from 'react-native'
import { menuItemData } from './menu.data'
import MenuItem from './MenuItem'

const BottomMenu = () => {
	return (
		<View>
			{menuItemData.map(item => (
				<MenuItem item={item} key={item.path} />
			))}
		</View>
	)
}

export default BottomMenu
