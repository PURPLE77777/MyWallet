import clsx from 'clsx'
import { Dispatch, FC, SetStateAction } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'

import { EnumTypeTransaction } from '@AppTypes/section.interface'

import { SelectedSectionType } from '../type/section.interface'

interface ISwitchBtns {
	typeTransactions: EnumTypeTransaction
	setTypeTransactions: Dispatch<SetStateAction<EnumTypeTransaction>>
	setSelectedSection?: Dispatch<SetStateAction<SelectedSectionType>>
}

const SwitchBtns: FC<ISwitchBtns> = ({
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

	return (
		<View className='flex-row items-center justify-center'>
			<TouchableWithoutFeedback onPress={setGainSection}>
				<Text
					className={clsx(
						'bg-primaryPurple p-5 font-bold text-white',
						typeTransactions === EnumTypeTransaction.GAIN ? 'underline' : ''
					)}
				>
					Gains
				</Text>
			</TouchableWithoutFeedback>
			<TouchableWithoutFeedback onPress={setExpenseSection}>
				<Text
					className={clsx(
						'bg-primaryPurple p-5 font-bold text-white',
						typeTransactions === EnumTypeTransaction.EXPENSE ? 'underline' : ''
					)}
				>
					Expenses
				</Text>
			</TouchableWithoutFeedback>
		</View>
	)
}

export default SwitchBtns
