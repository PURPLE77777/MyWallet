import clsx from 'clsx'
import { FC } from 'react'
import { ScrollView, View } from 'react-native'

import { IItemData } from '@AppTypes/pieData.interface'
import { EnumTypeTransaction } from '@AppTypes/section.interface'

import Icon from '@ui/icons/Icon'
import Txt from '@ui/text/Txt'

interface IPieLegend {
	data: IItemData[] | undefined
}

const PieLegend: FC<IPieLegend> = ({ data }) => {
	console.log(data)
	return (
		<ScrollView className='w-full rounded-[10px] bg-primaryLightGray px-3'>
			{data
				?.sort((first, sec) => sec.amount - first.amount)
				.map((section, ind) => (
					<View
						className={clsx(
							'flex-row items-center justify-between py-3',
							ind !== data.length - 1 && 'border-b-2 border-solid border-white'
						)}
						key={ind}
					>
						<View className='flex-row flex-nowrap gap-x-3'>
							<Icon name={section.icon} color={section.color} size={30} />
							<Txt className='text-[15px] text-white'>{section.name}</Txt>
						</View>
						<View className='flex-row flex-nowrap gap-x-3'>
							<Txt className='text-[15px] text-white'>{section.percent}%</Txt>
							<Txt
								className={clsx(
									'text-[15px] text-white',
									section.type === EnumTypeTransaction.GAIN &&
										'text-primaryGreen',
									section.type === EnumTypeTransaction.EXPENSE &&
										'text-primatyRed'
								)}
							>
								{section.amount}
							</Txt>
						</View>
					</View>
				))}
		</ScrollView>
	)
}

export default PieLegend
