import clsx from 'clsx'
import { Dispatch, FC, SetStateAction } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'

import { GainExpenseType, SelectedSectionType } from '../type/section.interface'

interface ISwitchBtns {
	typeTransactions: GainExpenseType
	setTypeTransactions: Dispatch<SetStateAction<GainExpenseType>>
	setSelectedSection: Dispatch<SetStateAction<SelectedSectionType>>
}

const SwitchBtns: FC<ISwitchBtns> = ({
	typeTransactions,
	setTypeTransactions,
	setSelectedSection
}) => {
	const setGainSection = () => {
		setTypeTransactions('gains')
		setSelectedSection(null)
	}

	const setExpenseSection = () => {
		setTypeTransactions('expenses')
		setSelectedSection(null)
	}

	return (
		<View className='flex-row items-center justify-center'>
			<TouchableWithoutFeedback onPress={setGainSection}>
				<Text
					className={clsx(
						'bg-primaryPurple p-5 font-bold text-white',
						typeTransactions === 'gains' ? 'underline' : ''
					)}
				>
					Gains
				</Text>
			</TouchableWithoutFeedback>
			<TouchableWithoutFeedback onPress={setExpenseSection}>
				<Text
					className={clsx(
						'bg-primaryPurple p-5 font-bold text-white',
						typeTransactions === 'expenses' ? 'underline' : ''
					)}
				>
					Expenses
				</Text>
			</TouchableWithoutFeedback>
		</View>
	)
}

export default SwitchBtns
