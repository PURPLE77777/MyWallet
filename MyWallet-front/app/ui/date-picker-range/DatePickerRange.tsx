import DateTimePicker, {
	DateTimePickerEvent
} from '@react-native-community/datetimepicker'
import clsx from 'clsx'
import { Dispatch, FC, SetStateAction, useRef, useState } from 'react'
import { View } from 'react-native'

import { dateFrFormat, dateToFormat } from '@utils/dateformatFrDate'

import Button from '@ui/button/Button'

interface IDatePickerRange {
	cNView?: string
	cNBtns?: string
	cNSpacier?: string
	styleText?: string
	dateStart: string
	dateEnd: string
	setDateStart: Dispatch<SetStateAction<string>>
	setDateEnd: Dispatch<SetStateAction<string>>
	onStartDateChange: (event: DateTimePickerEvent, date?: Date) => void
	onEndDateChange: (event: DateTimePickerEvent, date?: Date) => void
}

const DatePickerRange: FC<IDatePickerRange> = ({
	cNView,
	cNBtns,
	styleText,
	cNSpacier,
	dateEnd,
	dateStart,
	setDateStart,
	setDateEnd,
	onStartDateChange,
	onEndDateChange
}) => {
	const typeDate = useRef<'start' | 'end'>('start')
	const [datePickerShow, setDatePickerShow] = useState(false)

	const onPressStartDate = () => {
		typeDate.current = 'start'
		setDatePickerShow(true)
	}

	const onPressEndDate = () => {
		typeDate.current = 'end'
		setDatePickerShow(true)
	}

	const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
		if (date && event.type !== 'dismissed') {
			const newDate = dateToFormat(date)
			if (typeDate.current === 'start' && dateStart !== newDate) {
				setDateStart(newDate)
				onStartDateChange(event, date)
			} else if (dateEnd !== newDate) {
				setDateEnd(newDate)
				onEndDateChange(event, date)
			}
		}
		setDatePickerShow(false)
	}

	return (
		<View className={clsx('flex-row justify-center', cNView)}>
			<Button
				text={dateStart}
				cN={clsx('rounded-r-2xl', cNBtns)}
				onPress={onPressStartDate}
				styleText={styleText}
			/>
			<View className={clsx('w-[6px] bg-black', cNSpacier)} />
			<Button
				cN={clsx('rounded-l-2xl', cNBtns)}
				text={dateEnd}
				onPress={onPressEndDate}
				styleText={styleText}
			/>
			{datePickerShow && (
				<DateTimePicker
					value={
						typeDate.current === 'start'
							? dateFrFormat(dateStart)
							: dateFrFormat(dateEnd)
					}
					onChange={onDateChange}
					themeVariant='dark'
					display='spinner'
				/>
			)}
		</View>
	)
}

export default DatePickerRange
