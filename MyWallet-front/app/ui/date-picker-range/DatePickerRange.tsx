import clsx from 'clsx'
import { FC } from 'react'
import { View } from 'react-native'

import Button from '@ui/button/Button'

interface IDatePickerRange {
	cN
	dateStart: string
	dateEnd: string
	onDateStartPress: () => void
	onDateEndPress: () => void
}

const DatePickerRange: FC<IDatePickerRange> = ({
	cN,
	dateEnd,
	dateStart,
	onDateEndPress,
	onDateStartPress
}) => {
	return (
		<View className={clsx('flex-row justify-center', cN)}>
			<Button text={dateStart} cN='rounded-r-2xl' onPress={onDateEndPress} />
			<View className='w-[6px] bg-black' />
			<Button cN='rounded-l-2xl' text={dateEnd} onPress={onDateStartPress} />
		</View>
	)
}

export default DatePickerRange
