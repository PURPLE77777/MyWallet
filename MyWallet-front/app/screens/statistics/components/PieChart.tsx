import { FC, useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { VictoryPie } from 'victory-native'

import { IItemData, IPieChart } from '@AppTypes/pieData.interface'

import Icon from '@ui/icons/Icon'

const PieChart: FC<IPieChart> = ({ data, size }) => {
	const [pieColors, setPieColors] = useState<string[]>([])
	const iconSize = 30

	useEffect(() => {
		const colors: string[] = []
		data.forEach(item => {
			colors.push(item.color)
		})
		setPieColors(colors)
	}, [data])

	const CustomLabel: FC<any> = props => {
		const point: IItemData = props.datum
		return (
			<View
				className='absolute'
				style={{
					top: props.y - iconSize / 2,
					left: props.x - iconSize / 2
				}}
			>
				<Icon name={point.icon} color='white' size={iconSize} />
			</View>
		)
	}

	return (
		<View className='relative my-5 items-center justify-center'>
			<VictoryPie
				data={data}
				colorScale={pieColors}
				x='name'
				y='amount'
				padding={0}
				width={size}
				height={size}
				padAngle={2}
				innerRadius={size / 4}
				labelRadius={size / 2.6}
				labelComponent={<CustomLabel />}
			/>
			<Text className='absolute font-comfortaaBold text-[40px] text-white'>
				{data.reduce((sum, item) => sum + item.amount, 0)}
			</Text>
		</View>
	)
}

export default PieChart
