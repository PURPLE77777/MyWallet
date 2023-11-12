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

import { SelectedSectionType } from '../type/section.interface'

import SectionItem from './SectionItem'

interface ISectionPreview {
	typeTransactions: EnumTypeTransaction
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
			className={clsx('m-5 flex-1 items-center justify-between', {
				'justify-center ': isFetching
			})}
		>
			<View
				className={clsx('flex-row flex-wrap items-baseline gap-y-3', {
					'w-full': !isFetching
				})}
			>
				{isFetching ? (
					<ActivityIndicator
						animating={isFetching}
						size='large'
						color={COLORS.primaryLightGray}
					/>
				) : (
					data
						?.filter(item => item.type === typeTransactions)
						.map((gain, ind) => (
							<SectionItem
								// className={clsx(ind > 3 && 'mt-3')}
								activeSection={selectedSection}
								section={gain}
								setActiveSection={setSelectedSection}
								key={`gain-${gain.id}`}
							/>
						))
				)}
				{!isFetching && (
					<Pressable
						className={clsx('w-1/4 items-center rounded-xl p-1 pt-0', {
							'mt-3': data && data?.length > 3
						})}
						onPress={() => {
							setSelectedSection(null)
							navigate('SectionProfile', {
								section: null,
								sectionType: typeTransactions
							})
						}}
					>
						<View className='rounded-full bg-gray-400 p-3'>
							<Icon name='pluscircle' color={'#fff'} size={40} />
						</View>
						<Text className='text-center text-white'>Create</Text>
					</Pressable>
				)}
			</View>

			{selectedSection && !isFetching && (
				<View className='w-full flex-row flex-nowrap justify-between'>
					<Button
						text={'Edit'}
						onPress={() =>
							navigate('SectionProfile', {
								section: selectedSection,
								sectionType: typeTransactions
							})
						}
						className='basis-[45%] bg-primaryGreen'
					/>
					<Button
						text={'Delete'}
						className='basis-[45%] bg-primatyRed'
						onPress={() => setSelectedSection(null)}
					/>
				</View>
			)}
		</View>
	)
}

export default SectionPreview
