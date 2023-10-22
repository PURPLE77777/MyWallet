import clsx from 'clsx'
import { FC } from 'react'
import { Pressable } from 'react-native'

import Icon from '@ui/icons/Icon'

import { ISectionIcon } from '../type/section.interface'

const SectionIcon: FC<ISectionIcon> = ({
	icon,
	sectionColor,
	sectionIcon,
	setSectionIcon
}) => {
	return (
		<Pressable
			key={`icon_gain-${icon}`}
			onPress={() => setSectionIcon(icon)}
			className={clsx(
				'border-[5px] border-solid border-transparent p-1',
				icon === sectionIcon && 'border-[#e3e3e3] ' + sectionColor
			)}
		>
			<Icon name={icon} color='white' size={40} />
		</Pressable>
	)
}

export default SectionIcon
