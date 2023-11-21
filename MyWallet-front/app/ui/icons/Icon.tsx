/* eslint-disable @typescript-eslint/ban-ts-comment */
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
		case 'plus':
			// @ts-ignore
			return <Entypo {...propsObj} />
		case 'heartbeat':
			return <FontAwesome5 {...propsObj} />
		case 'wallet':
			// @ts-ignore
			return <Fontisto {...propsObj} />
		case 'pluscircle':
		case 'caretdown':
		case ICONS.Statistics:
		case 'caretup':
			// @ts-ignore
			return <AntDesign {...propsObj} />
		case 'home':
		case 'gift-outline':
		case ICONS.SectionsCnf:
			// @ts-ignore
			return <Ionicons {...propsObj} />
		case ICONS.Wallets:
		case ICONS.Profile:
		case 'food-fork-drink':
		case 'hand-coin-outline':
		case 'sack-percent':
			// @ts-ignore
			return <MaterialCommunityIcons {...propsObj} />
		default:
			propsObj.name = 'file-question-outline'
			// @ts-ignore
			return <MaterialCommunityIcons {...propsObj} />
	}
}

export default Icon
