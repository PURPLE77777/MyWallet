import clsx from 'clsx'
import { Dispatch, FC, SetStateAction } from 'react'
import { Pressable, View } from 'react-native'

import { EnumTypeTransaction, ISection } from '@AppTypes/section.interface'

import Txt from '@ui/text/Txt'

interface ISectionsDropMenu {
	typeTransaction: EnumTypeTransaction
	setTypeTransaaction: Dispatch<SetStateAction<EnumTypeTransaction>>
	setSelSection: Dispatch<SetStateAction<ISection | null>>
	active?: boolean
}

const RadioBtns: FC<ISectionsDropMenu> = ({
	typeTransaction,
	setTypeTransaaction,
	setSelSection,
	active = true
}) => {
	return (
		<View className='mt-5 flex-row justify-around'>
			<Pressable
				accessible={active}
				className='flex-row items-center'
				onPress={() => {
					if (active) {
						setTypeTransaaction(EnumTypeTransaction.GAIN)
						setSelSection(null)
					}
				}}
			>
				<View className='h-[20px] w-[20px] rounded-full border-[2px] border-solid border-white'>
					<View
						className={clsx(
							'h-full w-full rounded-full',
							typeTransaction === EnumTypeTransaction.GAIN && 'bg-[#3d3dff]'
						)}
					/>
				</View>
				<Txt className='ml-[15px]'>Gain</Txt>
			</Pressable>
			<Pressable
				accessible={active}
				className='flex-row items-center'
				onPress={() => {
					if (active) {
						setTypeTransaaction(EnumTypeTransaction.EXPENSE)
						setSelSection(null)
					}
				}}
			>
				<View className='h-[20px] w-[20px] rounded-full border-[2px] border-solid border-white'>
					<View
						className={clsx(
							'h-full w-full rounded-full',
							typeTransaction === EnumTypeTransaction.EXPENSE && 'bg-[#3d3dff]'
						)}
					/>
				</View>
				<Txt className='ml-[15px]'>Expense</Txt>
			</Pressable>
		</View>
	)
}

export default RadioBtns
