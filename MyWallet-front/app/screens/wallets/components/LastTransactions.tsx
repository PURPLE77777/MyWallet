import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { useNavigation } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import { FC, useState } from 'react'
import {
	ActivityIndicator,
	ScrollView,
	TouchableOpacity,
	View
} from 'react-native'

import { COLORS } from '@constants/colors.constants'
import { monthsRu } from '@constants/month.ru.constants'

import {
	EnumTransactionSort,
	ITransactionResponse
} from '@services/transaction/transaction.dto'
import TransactionService from '@services/transaction/transaction.service'

import { IDateSelection } from '@AppTypes/pagination.dto'
import { EnumTypeTransaction } from '@AppTypes/section.interface'
import { IWallet, WalletsType } from '@AppTypes/waller.interface'

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
	const [dateStart, setDateStart] = useState(dateToFormat(startMCurDate))
	const [dateEnd, setDateEnd] = useState(dateToFormat(curDate))

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	const { navigate } = useNavigation<WalletsType>()

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
		mutationFn: async (data: IDateSelection) => {
			return await TransactionService.getAll(wallet.id, {
				sort: EnumTransactionSort.NEWEST,
				...data
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

	const onStartDateChange = (event: DateTimePickerEvent, date?: Date) => {
		mutateTrans({
			frDate: date,
			toDate: dateFrFormat(dateEnd)
		})
	}

	const onEndDateChange = (event: DateTimePickerEvent, date?: Date) => {
		mutateTrans({
			frDate: dateFrFormat(dateStart),
			toDate: date
		})
	}

	const onTransactionPress = (transaction: ITransactionResponse) => {
		// console.log(navigation)
		navigate('TransactionProfile', {
			wallet,
			transaction
		})
	}

	return (
		<View className='mt-5 w-full flex-1 items-center '>
			<DatePickerRange
				cNView='rounded-t-[10px] bg-primaryLightGray p-3'
				cNBtns='h-[30px]'
				styleText='text-[14px]'
				onStartDateChange={onStartDateChange}
				onEndDateChange={onEndDateChange}
				dateStart={dateStart}
				dateEnd={dateEnd}
				setDateStart={setDateStart}
				setDateEnd={setDateEnd}
			/>
			<View className='w-full flex-1 rounded-[10px] bg-primaryLightGray px-3'>
				{isFetching || isMutating ? (
					<ActivityIndicator
						className='h-full w-full'
						animating={isFetching || isMutating}
						size='large'
						color={COLORS.primaryDarkGray}
					/>
				) : data?.length ? (
					<ScrollView showsVerticalScrollIndicator={false}>
						{data.map((transaction, index) => (
							<TouchableOpacity
								className='flex-row items-center justify-between'
								key={`last_transactions-${transaction.id}`}
								activeOpacity={0.5}
								onPress={() => onTransactionPress(transaction)}
							>
								<View
									className={clsx(transaction.section.color, 'rounded-md p-1')}
								>
									<Icon name={transaction.section.icon} size={38} />
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
											{formatDate(new Date(transaction.createdAt))}
										</Txt>
										<Txt className='text-sm'>{transaction.section.name}</Txt>
									</View>
									<Txt
										className={clsx(
											'font-comfortaaBold',
											transaction.section.type === EnumTypeTransaction.GAIN
												? 'text-primaryGreen'
												: 'text-primaryRed'
										)}
									>
										{transaction.section.type === EnumTypeTransaction.GAIN
											? transaction.amount
											: '-' + transaction.amount}
									</Txt>
								</View>
							</TouchableOpacity>
						))}
					</ScrollView>
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
