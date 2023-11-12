import clsx from 'clsx'
import { Dispatch, FC, SetStateAction } from 'react'
import { FlatList, TouchableHighlight, View } from 'react-native'

import { ISection } from '@AppTypes/section.interface'

import Icon from '@ui/icons/Icon'
import Txt from '@ui/text/Txt'

interface ISectionsDropMenu {
	sections: ISection[] | undefined
	selSection: ISection | null
	setSelSection: Dispatch<SetStateAction<ISection | null>>
	showMenu: boolean
	selSectionError: boolean
	setSelSectionError: Dispatch<SetStateAction<boolean>>
	setShowMenu: Dispatch<SetStateAction<boolean>>
}

const SectionsDropMenu: FC<ISectionsDropMenu> = ({
	showMenu,
	selSectionError,
	setShowMenu,
	sections,
	selSection,
	setSelSection,
	setSelSectionError
}) => {
	const dropdownMenuHandle = (section: ISection) => {
		setShowMenu(false)
		setSelSection(section)
		setSelSectionError(false)
	}

	const Item: FC<{ section: ISection }> = ({ section }) => (
		<TouchableHighlight onPress={() => dropdownMenuHandle(section)}>
			<Txt>{section.name}</Txt>
		</TouchableHighlight>
	)

	return (
		<View className='my-5'>
			<Txt className='mb-3 ml-2'>Section:</Txt>
			<View className='relative z-10'>
				<TouchableHighlight
					className={clsx(
						'flex-row items-center justify-between rounded-xl border-4 border-solid bg-gray-700 px-3 py-2',
						selSectionError ? 'border-primatyRed' : 'border-primaryPurple'
					)}
					onPress={() => setShowMenu(!showMenu)}
					activeOpacity={0.5}
					underlayColor={'#14171c'}
				>
					<>
						<Txt>{selSection ? selSection.name : 'Select section'}</Txt>
						<View className={clsx(showMenu ? ' pt-[3px]' : ' pb-[3px]')}>
							<Icon
								name={showMenu ? 'caretup' : 'caretdown'}
								size={24}
								color='white'
							/>
						</View>
					</>
				</TouchableHighlight>
				{showMenu && sections && (
					<FlatList
						className='absolute left-[4px] top-[90%] w-[98%] bg-gray-700'
						data={sections}
						renderItem={({ item }) => <Item section={item} />}
					/>
				)}
			</View>
		</View>
	)
}

export default SectionsDropMenu
