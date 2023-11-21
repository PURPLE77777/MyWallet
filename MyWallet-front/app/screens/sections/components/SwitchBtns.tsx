import clsx from 'clsx'
import { Dispatch, FC, SetStateAction } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'

import { EnumTypeTransaction } from '@AppTypes/section.interface'

import { SelectedSectionType } from '../types/section.interface'

interface ISwitchBtns {
	typeTransactions: EnumTypeTransaction
	setTypeTransactions: Dispatch<SetStateAction<EnumTypeTransaction>>
	setSelectedSection?: Dispatch<SetStateAction<SelectedSectionType>>
	cN?: string
}

const SwitchBtns: FC<ISwitchBtns> = ({
	cN,
	typeTransactions,
	setTypeTransactions,
	setSelectedSection
}) => {
	const setGainSection = () => {
		setTypeTransactions(EnumTypeTransaction.GAIN)
		setSelectedSection && setSelectedSection(null)
	}

	const setExpenseSection = () => {
		setTypeTransactions(EnumTypeTransaction.EXPENSE)
		setSelectedSection && setSelectedSection(null)
	}

	const btnStyle = 'w-[90px] bg-primaryPurple px-0 py-2 text-center text-white'

	return (
		<View className={clsx('flex-row', cN)}>
			<View className='flex-row items-center justify-center overflow-hidden rounded-xl'>
				<View
					style={{
						left: typeTransactions === EnumTypeTransaction.GAIN ? 0 : 96
					}}
					className={clsx(
						'absolute top-0 z-10 h-[5px] w-[90px] bg-primaryYellow'
					)}
				/>
				<TouchableWithoutFeedback onPress={setGainSection}>
					<Text
						className={clsx(
							btnStyle,
							typeTransactions === EnumTypeTransaction.GAIN && 'font-bold'
						)}
					>
						Gains
					</Text>
				</TouchableWithoutFeedback>
				<View className='h-full w-[6px] bg-primaryLightGray' />
				<TouchableWithoutFeedback onPress={setExpenseSection}>
					<Text
						className={clsx(
							btnStyle,
							typeTransactions === EnumTypeTransaction.EXPENSE && 'font-bold'
						)}
					>
						Expenses
					</Text>
				</TouchableWithoutFeedback>
			</View>
		</View>
	)
}

export default SwitchBtns
