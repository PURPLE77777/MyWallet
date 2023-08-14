import cn from 'clsx'
import { useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

import { generateRandomTransactionData } from '@constants/transactions.constant'

import { ITransactionsData } from '@AppTypes/transactions.interface'

const LastTransactions = () => {
	const [transactions, setTransactions] = useState<ITransactionsData[]>([])

	useEffect(() => {
		const data = generateRandomTransactionData()

		const copyTrans: ITransactionsData[] = JSON.parse(
			JSON.stringify(data.transactions)
		)
		const sortedTrans = copyTrans.sort((first, sec) => {
			const firstDate = new Date(first.date)
			const secDate = new Date(sec.date)
			if (firstDate.getTime() > secDate.getTime()) return -1
			else if (firstDate.getTime() < secDate.getTime()) return 1
			else return 0
		})
		setTransactions(sortedTrans.slice(0, 7))
	}, [])

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
		<ScrollView className='mx-5 h-[250px] rounded-[10px] bg-primaryLightGray px-3'>
			{transactions.map((transaction, ind) => {
				const gains = transaction.gains.reduce(
					(prev, gain) => prev + gain.amount,
					0
				)
				const expenses = transaction.expenses.reduce(
					(prev, expense) => prev + expense.amount,
					0
				)

				const result = gains - expenses

				const transDate = new Date(transaction.date)

				return (
					<View
						className='rounded-md border-[3px] border-solid border-transparent'
						key={`transaction-${ind}`}
					>
						<Text className='text-center font-comfortaa text-lg text-white'>
							{`${transDate.getDate()} ${
								monthsRu[transDate.getMonth()]
							} ${transDate.getFullYear()}`}
						</Text>
						<View className='flex-row justify-between'>
							<Text className='font-comfortaa text-lg text-white'>
								{result > 0 ? 'Up' : result < 0 ? 'Down' : 'No changes'}
							</Text>

							{/* Graphic */}

							<Text
								className={cn(
									'font-comfortaa text-lg',
									result > 0
										? 'text-primaryGreen'
										: result < 0
										? 'text-primatyRed'
										: 'text-gray-400'
								)}
							>
								{result > 0 ? `+${result} BYN` : `${result} BYN`}
							</Text>
						</View>
					</View>
				)
			})}
		</ScrollView>
	)
}

export default LastTransactions
