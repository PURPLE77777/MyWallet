import clsx from 'clsx'
import { ComponentProps, Dispatch, FC, SetStateAction } from 'react'
import { Pressable, Text, View } from 'react-native'

import { ISection } from '@AppTypes/section.interface'

import Icon from '@ui/icons/Icon'

interface ISectionItem extends ComponentProps<any> {
	section: ISection
	activeSection: ISection | null
	setActiveSection: Dispatch<SetStateAction<ISection | null>>
}

const SectionItem: FC<ISectionItem> = ({
	section,
	activeSection,
	setActiveSection,
	...attr
}) => {
	return (
		<Pressable
			className={clsx(
				`h-[100px] w-1/4 items-center rounded-xl`,
				activeSection?.id === section.id && section.color
			)}
			key={`gain-${section.id}`}
			onPress={() => setActiveSection(section)}
			{...attr}
		>
			<View className={clsx('rounded-full p-4', section.color)}>
				<Icon name={section.icon} color='#fff' size={40} />
			</View>
			<Text className='text-center text-white'>{section.name}</Text>
		</Pressable>
	)
}

export default SectionItem
