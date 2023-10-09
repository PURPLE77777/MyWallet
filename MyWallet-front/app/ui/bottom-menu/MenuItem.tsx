import { clsx } from 'clsx'
import { FC } from 'react'
import { TouchableHighlight } from 'react-native'

import { RootStackParamList, TypeNavigate } from '@navigation/navigation.types'

import { COLORS } from '@constants/colors.constants'

import Icon from '@ui/icons/Icon'

import { IMenuItemData } from './menu.interface'

interface IMenuItem {
	item: IMenuItemData
	num: number
	navigate: TypeNavigate
	currentRoute: string
}

const MenuItem: FC<IMenuItem> = ({ item, num, currentRoute, navigate }) => {
	const colors = [
		COLORS.primaryGreen,
		COLORS.primaryPurple,
		COLORS.primaryLightGray,
		COLORS.primaryRed
	]

	const nav = (name: keyof RootStackParamList) => {
		if (currentRoute !== name) navigate(name)
	}

	return (
		<TouchableHighlight
			className={clsx(
				'h-[50px] w-[25%] items-center justify-center',
				'bg-primaryLightGray'
				// num == 0
				// 	? 'bg-primaryLightGray'
				// 	: num == 1
				// 	? 'bg-primaryDarkGray'
				// 	: num == 2
				// 	? 'bg-primaryGreen'
				// 	: num == 3
				// 	? 'bg-primaryPurple'
				// 	: ''
			)}
			onPress={() => nav(item.path)}
		>
			<Icon name={item.iconName} color={colors[0]} />
		</TouchableHighlight>
	)
}

export default MenuItem
