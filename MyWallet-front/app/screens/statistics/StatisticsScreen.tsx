import { DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { useRoute } from '@react-navigation/native'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'

import { COLORS, SECTION_COLORS_HEX } from '@constants/colors.constants'

import SectionService from '@services/section/section.service'

import SwitchBtns from '@screens/sections/components/SwitchBtns'

import { IDateSelection } from '@AppTypes/pagination.dto'
import { IItemData } from '@AppTypes/pieData.interface'
import { EnumTypeTransaction } from '@AppTypes/section.interface'

import { useTypedSelector } from '@hooks/useTypedSelector'

import { dateFrFormat, dateToFormat } from '@utils/dateformatFrDate'

import DatePickerRange from '@ui/date-picker-range/DatePickerRange'
import Layout from '@ui/layout/Layout'

import PieChart from './components/PieChart'
import PieLegend from './components/PieLegend'

const StatisticsScreen = () => {
	const curDate = new Date(),
		startMCurDate = new Date(curDate.getFullYear(), curDate.getMonth(), 1)
	const route = useRoute()
	const [sectionsType, setSectionsType] = useState<EnumTypeTransaction>(
		EnumTypeTransaction.GAIN
	)

	const [dateStart, setDateStart] = useState(dateToFormat(startMCurDate))
	const [dateEnd, setDateEnd] = useState(dateToFormat(curDate))

	const [pieData, setPieData] = useState<IItemData[]>([])

	const { selectedWallet } = useTypedSelector(({ wallets }) => wallets)
	const queryClient = useQueryClient()

	const { data, isFetching } = useQuery({
		enabled: !!selectedWallet,
		queryKey: [`${sectionsType}`, selectedWallet?.id],
		queryFn: async () => {
			return SectionService.getAll(selectedWallet!.id, {
				frDate: dateFrFormat(dateStart),
				toDate: dateFrFormat(dateEnd)
			})
		}
	})

	useEffect(() => {
		if (data) {
			const filteredData = data.filter(section => section.type === sectionsType)
			const newData: IItemData[] = []
			const sum = filteredData.reduce((s, section) => s + section.amount, 0)

			filteredData.forEach(section => {
				newData.push({
					name: section.name,
					amount: section.amount,
					color: SECTION_COLORS_HEX[section.color],
					icon: section.icon,
					type: section.type,
					percent: Math.round((section.amount / sum) * 1000) / 10
				})
			})

			setPieData(newData)
		}
	}, [data, sectionsType])

	const { mutate: mutateSect, isLoading: isMutating } = useMutation({
		mutationFn: async (data: IDateSelection) => {
			return SectionService.getAll(selectedWallet!.id, data)
		},
		onSuccess: data => {
			console.log('mutate data:', data)
			queryClient.setQueryData([`${sectionsType}`, selectedWallet?.id], data)
		}
	})

	const onStartDateChange = (event: DateTimePickerEvent, date?: Date) => {
		mutateSect({
			frDate: date,
			toDate: dateFrFormat(dateEnd)
		})
	}

	const onEndDateChange = (event: DateTimePickerEvent, date?: Date) => {
		mutateSect({
			frDate: dateFrFormat(dateStart),
			toDate: date
		})
	}

	return (
		<Layout title={route.name}>
			<View className='m-5 flex-1 items-center'>
				<DatePickerRange
					cNView='m-3 mt-0'
					cNBtns='h-[30px]'
					styleText='text-[14px]'
					cNSpacier='bg-primaryLightGray'
					onStartDateChange={onStartDateChange}
					onEndDateChange={onEndDateChange}
					dateStart={dateStart}
					dateEnd={dateEnd}
					setDateStart={setDateStart}
					setDateEnd={setDateEnd}
				/>
				<SwitchBtns
					typeTransactions={sectionsType}
					setTypeTransactions={setSectionsType}
				/>
				{isFetching || isMutating ? (
					<View className='flex-1 justify-center'>
						<ActivityIndicator
							animating={isFetching || isMutating}
							size='large'
							color={COLORS.primaryLightGray}
						/>
					</View>
				) : (
					!!pieData.length && (
						<>
							<PieChart data={pieData} size={250} />
							<PieLegend data={pieData} />
						</>
					)
				)}
			</View>
		</Layout>
	)
}

export default StatisticsScreen
