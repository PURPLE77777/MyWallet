import { useRoute } from '@react-navigation/native'
import cn from 'clsx'
import { useEffect, useState } from 'react'
import {
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View
} from 'react-native'
import { PieChart } from 'react-native-gifted-charts'

import { COLORS } from '@constants/colors.constants'
import { generateRandomTransactionData } from '@constants/transactions.constant'

import Layout from '@ui/layout/Layout'

import { IStatisticks, IStats } from './types/statisticks.types'

const StatisticsScreen = () => {
	const [statView, setStatView] = useState<'gains' | 'expenses'>('gains')
	const [gainPieData, setGainPieData] = useState<IStats[]>([])
	const [expensePieData, setExpensePieData] = useState<IStats[]>([])
	const route = useRoute()

	const [statisticks, setStatisticks] = useState<IStatisticks | null>(null)

	const gainsStat: IStats[] = [],
		expensesStat: IStats[] = []

	useEffect(() => {
		const data = generateRandomTransactionData()
		setStatisticks({ gains: data.allGains, expenses: data.allExpenses })
	}, [])

	const refreshData = () => {
		const data = generateRandomTransactionData()
		setStatisticks({ gains: data.allGains, expenses: data.allExpenses })
	}

	useEffect(() => {
		statisticks?.gains.forEach(gain => {
			let gainInd: number = -1

			gainsStat.forEach((val, ind) => {
				if (gainInd === -1 && val.text === gain.section) {
					gainInd = ind
					return
				}
			})

			if (gainInd === -1) {
				gainsStat.push({
					text: gain.section,
					value: gain.amount,
					color: gain.color
				})
			} else {
				gainsStat[gainInd].value += gain.amount
			}
		})

		statisticks?.expenses.forEach(expense => {
			let expInd: number = -1

			expensesStat.forEach((val, ind) => {
				if (expInd === -1 && val.text === expense.section) {
					expInd = ind
					return
				}
			})

			if (expInd === -1) {
				expensesStat.push({
					text: expense.section,
					value: expense.amount,
					color: expense.color
				})
			} else {
				expensesStat[expInd].value += expense.amount
			}
		})

		setGainPieData(gainsStat)
		setExpensePieData(expensesStat)
	}, [statisticks])

	const setGainSection = () => {
		setStatView('gains')
	}

	const setExpenseSection = () => {
		setStatView('expenses')
	}

	return (
		<Layout title={route.name}>
			<View className='flex-1 items-center'>
				<View className='flex-row items-center justify-center'>
					<TouchableWithoutFeedback onPress={setGainSection}>
						<Text
							className={cn(
								'bg-primaryPurple p-5 font-bold text-white',
								statView === 'gains' ? 'underline' : ''
							)}
						>
							Gains
						</Text>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={setExpenseSection}>
						<Text
							className={cn(
								'bg-primaryPurple p-5 font-bold text-white',
								statView === 'expenses' ? 'underline' : ''
							)}
						>
							Expenses
						</Text>
					</TouchableWithoutFeedback>
				</View>
				<View className=''>
					<PieChart
						data={statView === 'gains' ? gainPieData : expensePieData}
						donut
						innerRadius={80}
						// innerCircleBorderColor={'#00000010'}
						// labelsPosition='onBorder'
						innerCircleColor={COLORS.primaryDarkGray}
						labelsPosition='outward'
						radius={140}
					/>
				</View>

				<View>
					{statView === 'gains'
						? gainPieData.map((gain, ind) => {
								return (
									<View
										className='w-[350px] flex-row justify-between'
										key={ind}
									>
										<View
											className='h-[30px] w-[30px]'
											style={{ backgroundColor: gain.color }}
										></View>
										<Text className='text-white'>{gain.text}</Text>
										<Text className='text-white'>{gain.value}</Text>
									</View>
								)
						  })
						: expensePieData.map((exp, ind) => (
								<View className='w-[350px] flex-row justify-between' key={ind}>
									<View
										className='h-[30px] w-[30px]'
										style={{ backgroundColor: exp.color }}
									></View>
									<Text className='text-white'>{exp.text}</Text>
									<Text className='text-white'>{exp.value}</Text>
								</View>
						  ))}
				</View>

				<TouchableOpacity onPress={refreshData}>
					<Text className='mt-2 bg-slate-600 p-2'>Refresh</Text>
				</TouchableOpacity>
			</View>
		</Layout>
	)
}

export default StatisticsScreen
