import {
	AntDesign,
	Entypo,
	FontAwesome5,
	Fontisto,
	Ionicons,
	MaterialCommunityIcons
} from '@expo/vector-icons'
import { FC } from 'react'

import { ICONS } from '@constants/icons.constants'

import { IIcons } from './icons.interface'

interface IconsProps {
	name: IIcons | string
	size?: number
	color?: string
}

// working with type error in a "name" attribute
const Icon: FC<IconsProps> = (props): JSX.Element => {
	const propsObj = { ...props }

	if (!propsObj.size) propsObj.size = 24
	if (!propsObj.color) propsObj.color = 'black'

	switch (propsObj.name) {
		case ICONS.Statistics:
			return <Entypo {...propsObj} />
		case 'heartbeat':
			return <FontAwesome5 {...propsObj} />
		case 'wallet':
			return <Fontisto {...propsObj} />
		case 'pluscircle':
			return <AntDesign {...propsObj} />
		case 'home':
		case 'gift-outline':
		case ICONS.SectionsCnf:
			return <Ionicons {...propsObj} />
		case ICONS.Wallets:
		case ICONS.Profile:
		case 'food-fork-drink':
		case 'hand-coin-outline':
		case 'sack-percent':
			return <MaterialCommunityIcons {...propsObj} />
		default:
			propsObj.name = 'file-question-outline'
			return <MaterialCommunityIcons {...propsObj} />
	}
}

export default Icon
