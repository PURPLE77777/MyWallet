import clsx from 'clsx'
import React from 'react'
import {
	Dimensions,
	ListRenderItem,
	Platform,
	StyleSheet,
	View
} from 'react-native'
import {
	AdditionalParallaxProps,
	ParallaxImage
} from 'react-native-snap-carousel'

import { IWallet } from '@AppTypes/waller.interface'

import Txt from '@ui/text/Txt'

const { width: screenWidth } = Dimensions.get('window')

type ICarouselItem = ListRenderItem<IWallet> &
	((
		item: {
			item: IWallet
			index: number
		},
		parallaxProps?: AdditionalParallaxProps | undefined
	) => React.ReactNode)

const CarouselItem: ICarouselItem = (
	{ item }: { item: IWallet },
	parallaxProps?: AdditionalParallaxProps | undefined
) => {
	return (
		<View className='h-[200px] w-full'>
			<ParallaxImage
				source={require('@assets/images/map_of_planet.jpg')}
				containerStyle={styles.imageContainer}
				style={styles.image}
				parallaxFactor={0.4}
				{...parallaxProps}
			/>
			<View className='absolute left-0 top-0 h-full w-full rounded-lg bg-black opacity-70' />
			<View className='absolute left-4 top-1/4 w-full'>
				<Txt className='text-3xl capitalize' numberOfLines={2}>
					{item.name}
				</Txt>
				<View className={clsx('mt-5 flex-row text-2xl')}>
					<Txt>Account:</Txt>
					<Txt
						className={clsx(
							'ml-4',
							item.account > 0
								? 'text-primaryGreen'
								: item.account < 0
								? 'text-primatyRed'
								: ''
						)}
					>
						{item.account}
					</Txt>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	imageContainer: {
		flex: 1,
		marginBottom: Platform.select({ ios: 0, android: 1 }),
		backgroundColor: 'white',
		borderRadius: 8
	},
	image: {
		...StyleSheet.absoluteFillObject,
		resizeMode: 'cover'
	}
})

export default CarouselItem
