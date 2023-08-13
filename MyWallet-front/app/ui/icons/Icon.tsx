import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'
import { FC } from 'react'

import { ICONS } from '@constants/icons.constants'

import { IIcons } from './icons.interface'

interface IconsProps {
	name: IIcons
	size?: number
	color?: string
}

// working with type error in a "name" attribute
const Icon: FC<IconsProps> = (props): JSX.Element => {
	const propsObj = { ...props }

	if (!propsObj.size) propsObj.size = 24
	if (!propsObj.color) propsObj.color = 'black'

	switch (propsObj.name) {
		case ICONS.Wallets:
			return <MaterialCommunityIcons {...propsObj} />
		case ICONS.SectionsCnf:
			return <Ionicons {...propsObj} />
		case ICONS.Profile:
			return <MaterialCommunityIcons {...propsObj} />
		case ICONS.Statistics:
			return <Entypo {...propsObj} />
		default:
			return <MaterialCommunityIcons {...propsObj} />
	}
}

export default Icon
