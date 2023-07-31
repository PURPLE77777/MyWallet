import { FC, ReactNode } from 'react'
import { View, Text } from 'react-native'
import { IMenuItemData } from './menu.interface'

interface IMenuItem {
	item: IMenuItemData
}

const MenuItem: FC<IMenuItem> = ({ item }) => {
	return <View>{item.iconName as unknown as JSX.Element}</View>
}

export default MenuItem
