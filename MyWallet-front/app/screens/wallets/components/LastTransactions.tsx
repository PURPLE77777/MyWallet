import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { FC } from 'react'
import { ScrollView, View } from 'react-native'

import { EnumTransactionSort } from '@services/transaction/transaction.dto'
import TransactionService from '@services/transaction/transaction.service'

import { IWallet } from '@AppTypes/waller.interface'

import Icon from '@ui/icons/Icon'
import Txt from '@ui/text/Txt'

interface ILastTransactions {
	wallet: IWallet
}

const LastTransactions: FC<ILastTransactions> = ({ wallet }) => {
	const { data, isFetching } = useQuery({
		queryKey: ['last_transactions', wallet.id],
		queryFn: async () => {
			const response = await TransactionService.getAll(wallet.id, {
				sort: EnumTransactionSort.NEWEST,
				perPage: 5,
				page: 1
			})
			return response
		}
	})
	console.log(wallet.name, data, isFetching)

	const formatDate = (date: Date) => {
		const year = date.getFullYear(),
			month = date.getMonth() + 1,
			day = date.getDate(),
			hour = date.getHours(),
			minute = date.getMinutes()

		return `${day > 9 ? day : `0${day}`}.${
			month > 9 ? month : `0${month}`
		}.${year} ${hour > 9 ? hour : `0${hour}`}:${
			minute > 9 ? minute : `0${minute}`
		}`
	}

	const monthsRu = [
		'января',
		'февраля',
		'марта',
		'апреля',
		'мая',
		'июня',
		'июля',
		'августа',
		'сентября',
		'октября',
		'ноября',
		'декабря'
	]

	return (
		<ScrollView className='mx-5 mt-5 h-[250px] rounded-[10px] bg-primaryLightGray px-3'>
			{data?.map(
				(
					{ amount, id, createdAt, section: { type, name, icon, color } },
					index
				) => (
					<View
						className='flex-row items-center justify-between'
						key={`last_transactions-${id}`}
					>
						<View className={color}>
							<Icon name={icon} size={40} />
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
								<Txt className='text-sm'>{formatDate(new Date(createdAt))}</Txt>
								<Txt className='text-sm'>{name}</Txt>
							</View>
							<Txt
								className={clsx(
									'font-comfortaaBold',
									type === 'GAIN' ? 'text-primaryGreen' : 'text-primatyRed'
								)}
							>
								{type === 'GAIN' ? amount : '-' + amount}
							</Txt>
						</View>
					</View>
				)
			)}
		</ScrollView>
	)
}

export default LastTransactions
