import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { Dispatch, FC, SetStateAction } from 'react'
import { ActivityIndicator, Pressable, Text, View } from 'react-native'

import { COLORS } from '@constants/colors.constants'

import SectionService from '@services/section/section.service'

import { EnumTypeTransaction, ISection } from '@AppTypes/section.interface'

import { useTypedNavigation } from '@hooks/useTypedNavigation'
import { useTypedSelector } from '@hooks/useTypedSelector'

import Button from '@ui/button/Button'
import Icon from '@ui/icons/Icon'

import { GainExpenseType, SelectedSectionType } from '../type/section.interface'

import SectionItem from './SectionItem'

interface ISectionPreview {
	typeTransactions: GainExpenseType
	selectedSection: ISection | null
	setSelectedSection: Dispatch<SetStateAction<SelectedSectionType>>
}

const SectionPreview: FC<ISectionPreview> = ({
	typeTransactions,
	selectedSection,
	setSelectedSection
}) => {
	const { selectedWallet } = useTypedSelector(({ wallets }) => wallets)

	const { data, isFetching } = useQuery({
		enabled: !!selectedWallet,
		queryKey: [`${typeTransactions}`, selectedWallet?.id],
		queryFn: async () => {
			const response = await SectionService.getAll(selectedWallet!.id)
			return response
		}
	})
	const { navigate } = useTypedNavigation()

	return (
		<View
			className={clsx('mt-[30px] flex-1 items-center justify-between', {
				'justify-center ': isFetching
			})}
		>
			<View className={clsx('flex-row flex-wrap', { 'w-full': !isFetching })}>
				{isFetching ? (
					<ActivityIndicator
						animating={isFetching}
						size='large'
						color={COLORS.primaryLightGray}
					/>
				) : typeTransactions === 'gains' ? (
					data
						?.filter(item => item.type === EnumTypeTransaction.GAIN)
						.map((gain, ind) => (
							<SectionItem
								className={clsx({ 'mt-3': ind > 3 })}
								activeSection={selectedSection}
								section={gain}
								setActiveSection={setSelectedSection}
								key={`gain-${gain.id}`}
							/>
						))
				) : (
					data
						?.filter(expense => expense.type === EnumTypeTransaction.EXPENSE)
						.map((expense, ind) => (
							<SectionItem
								className={clsx({ 'mt-3': ind > 3 })}
								activeSection={selectedSection}
								section={expense}
								setActiveSection={setSelectedSection}
								key={`expense-${expense.id}`}
							/>
						))
				)}
				{!isFetching && (
					<Pressable
						className={clsx('h-[100px] w-1/4 items-center rounded-xl', {
							'mt-3': data && data?.length > 3
						})}
						onPress={() => {
							setSelectedSection(null)
							navigate('SectionProfile')
						}}
					>
						<View className='rounded-full bg-gray-400 p-4'>
							<Icon name='pluscircle' color={'#fff'} size={40} />
						</View>
						<Text className='text-center text-white'>Create</Text>
					</Pressable>
				)}
			</View>

			{selectedSection && !isFetching && (
				<View className='mb-5 flex-row gap-x-4 px-7'>
					<Button
						text={'Edit'}
						onPress={() =>
							navigate('SectionProfile', {
								section: selectedSection
							})
						}
						className='basis-1/2 bg-primaryGreen'
					></Button>
					<Button
						text={'Delete'}
						className='basis-1/2 bg-primatyRed'
						onPress={() => setSelectedSection(null)}
					></Button>
				</View>
			)}
		</View>
	)
}

export default SectionPreview
