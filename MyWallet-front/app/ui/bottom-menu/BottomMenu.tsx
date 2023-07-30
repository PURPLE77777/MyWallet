import { View, Text } from 'react-native'
import { IMenuItem } from './menu.interface'

interface IBottomMenu {
	item: IMenuItem
}

const BottomMenu = ({ item }: IBottomMenu) => {
	return (
		<View>
			<Text>BottomMenu</Text>
		</View>
	)
}

export default BottomMenu
