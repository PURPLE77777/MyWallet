import DateTimePicker, {
	DateTimePickerEvent
} from '@react-native-community/datetimepicker'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { FC, useRef, useState } from 'react'
import { ActivityIndicator, ScrollView, View } from 'react-native'

import { COLORS } from '@constants/colors.constants'
import { monthsRu } from '@constants/month.ru.constants'

import { EnumTransactionSort } from '@services/transaction/transaction.dto'
import TransactionService from '@services/transaction/transaction.service'

import { IWallet } from '@AppTypes/waller.interface'

import { dateFrFormat, dateToFormat } from '@utils/dateformatFrDate'

import DatePickerRange from '@ui/date-picker-range/DatePickerRange'
import Icon from '@ui/icons/Icon'
import Txt from '@ui/text/Txt'

interface ILastTransactions {
	wallet: IWallet
}

const LastTransactions: FC<ILastTransactions> = ({ wallet }) => {
	const curDate = new Date(),
		startMCurDate = new Date(curDate.getFullYear(), curDate.getMonth(), 1)
	const queryClient = useQueryClient()
	const [datePickerShow, setDatePickerShow] = useState(false)
	const [dateStart, setDateStart] = useState(dateToFormat(startMCurDate))
	const [dateEnd, setDateEnd] = useState(dateToFormat(curDate))

	const typeDate = useRef<'start' | 'end'>('start')

	const { data, isFetching } = useQuery({
		queryKey: ['last_transactions', wallet.id],
		queryFn: async () => {
			const response = await TransactionService.getAll(wallet.id, {
				sort: EnumTransactionSort.NEWEST,
				frDate: dateFrFormat(dateStart),
				toDate: dateFrFormat(dateEnd)
				// perPage: 1,
				// page: 1
			})

			return response
		}
	})

	const { mutate: mutateTrans, isLoading: isMutating } = useMutation({
		mutationFn: async ({
			frDate,
			toDate
		}: {
			frDate?: Date
			toDate?: Date
		}) => {
			return await TransactionService.getAll(wallet.id, {
				sort: EnumTransactionSort.NEWEST,
				frDate: frDate || dateFrFormat(dateStart),
				toDate: toDate || dateFrFormat(dateEnd)
				// perPage: 1,
				// page: 1
			})
		},
		onSuccess: data => {
			queryClient.setQueryData(['last_transactions', wallet.id], data)
		}
	})

	const formatDate = (date: Date) => {
		const year = date.getFullYear(),
			month = date.getMonth(),
			day = date.getDate(),
			hour = date.getHours(),
			minute = date.getMinutes()

		return `${day > 9 ? day : `0${day}`} ${monthsRu[month]} ${year} ${
			hour > 9 ? hour : `0${hour}`
		}:${minute > 9 ? minute : `0${minute}`}`
	}

	const onPressStartDate = () => {
		typeDate.current = 'start'
		setDatePickerShow(true)
	}

	const onPressEndDate = () => {
		typeDate.current = 'end'
		setDatePickerShow(true)
	}

	const onDateChange = (event: DateTimePickerEvent, date?: Date) => {
		if (date) {
			const newDate = dateToFormat(date)
			if (typeDate.current === 'start' && dateStart !== newDate) {
				setDateStart(newDate)
				mutateTrans({
					frDate: date
				})
			} else if (dateEnd !== newDate) {
				setDateEnd(newDate)
				mutateTrans({
					toDate: date
				})
			}
		}

		setDatePickerShow(false)
	}

	return (
		<View className='relative mt-5 w-full flex-1 items-center '>
			{/* <View className='absolute z-10 flex-row justify-center rounded-t-[10px] bg-primaryLightGray p-3'>
				<Button
					text={dateStart}
					className='rounded-r-2xl'
					onPress={onPressStartDate}
				/>
				<View className='w-[6px] bg-black' />
				<Button
					className='rounded-l-2xl'
					text={dateEnd}
					onPress={onPressEndDate}
				/>
			</View> */}
			<DatePickerRange
				cN='absolute z-10 rounded-t-[10px] bg-primaryLightGray p-3'
				dateStart={dateStart}
				dateEnd={dateEnd}
				onDateStartPress={onPressStartDate}
				onDateEndPress={onPressEndDate}
			/>
			<View className='mt-[64px] w-full rounded-[10px] bg-primaryLightGray px-3'>
				{datePickerShow && !isFetching && !isMutating && (
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
				{isFetching || isMutating ? (
					<ActivityIndicator
						className='h-full w-full'
						animating={isFetching || isMutating}
						size='large'
						color={COLORS.primaryDarkGray}
					/>
				) : data?.length ? (
					<>
						<ScrollView showsVerticalScrollIndicator={false}>
							{data.map(
								(
									{
										amount,
										id,
										createdAt,
										section: { type, name, icon, color }
									},
									index
								) => (
									<View
										className='flex-row items-center justify-between'
										key={`last_transactions-${id}`}
									>
										<View className={clsx(color, 'rounded-md p-1')}>
											<Icon name={icon} size={38} />
										</View>
										<View
											className={clsx(
												'ml-4 flex-grow flex-row items-center justify-between py-2',
												index !== data.length - 1
													? 'border-b-2 border-solid border-white'
													: ''
											)}
										>
											<View>
												<Txt className='text-sm'>
													{formatDate(new Date(createdAt))}
												</Txt>
												<Txt className='text-sm'>{name}</Txt>
											</View>
											<Txt
												className={clsx(
													'font-comfortaaBold',
													type === 'GAIN'
														? 'text-primaryGreen'
														: 'text-primatyRed'
												)}
											>
												{type === 'GAIN' ? amount : '-' + amount}
											</Txt>
										</View>
									</View>
								)
							)}
						</ScrollView>
					</>
				) : (
					<View className='h-full w-full items-center justify-center'>
						<Txt>No transactions</Txt>
					</View>
				)}
			</View>
		</View>
	)
}

export default LastTransactions
