import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { FC } from 'react'

import { ICONS } from '@constants/icons.constants'

import { IIcons } from './icons.interface'

interface IconsProps {
	iconName: IIcons
	size?: number
	color?: string
}

// working with type error in a "name" attribute
const Icon: FC<IconsProps> = ({
	iconName,
	size = 24,
	color = 'black'
}): JSX.Element => {
	switch (iconName) {
		case ICONS.Wallets:
			return (
				<MaterialCommunityIcons name={iconName} size={size} color={color} />
			)
		case ICONS.Settings:
			return <Ionicons name={iconName} size={size} color={color} />
		case ICONS.Profile:
			return (
				<MaterialCommunityIcons name={iconName} size={size} color={color} />
			)
		case ICONS.Statistics:
			return <FontAwesome name={iconName} size={size} color={color} />
		default:
			return (
				<MaterialCommunityIcons
					name='file-question'
					size={size}
					color={color}
				/>
			)
	}
}

export default Icon
