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
		<ScrollView className='gap-y-5 rounded-[10px] bg-primaryLightGray'>
			{data?.map((section, ind) => (
				<View
					className='w-[350px] flex-row items-center justify-between border-b-2 border-solid border-white'
					key={ind}
				>
					<View>
						<Icon name={section.icon} color={section.color} size={30} />
					</View>
					<Txt className='text-white'>{section.name}</Txt>
					<Txt className='text-white'>{section.percent}%</Txt>
					<Txt
						className={clsx(
							'text-white',
							section.type === EnumTypeTransaction.GAIN && 'text-primaryGreen',
							section.type === EnumTypeTransaction.EXPENSE && 'text-primatyRed'
						)}
					>
						{section.amount}
					</Txt>
				</View>
			))}
		</ScrollView>
	)
}

export default PieLegend
