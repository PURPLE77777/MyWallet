import clsx from 'clsx'
import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import {
	ListRenderItem,
	Platform,
	Pressable,
	StyleSheet,
	View,
	useWindowDimensions
} from 'react-native'
import Carousel, {
	AdditionalParallaxProps,
	Pagination,
	ParallaxImage
} from 'react-native-snap-carousel'

import { IWallet } from '@AppTypes/waller.interface'

import { useTypedNavigation } from '@hooks/useTypedNavigation'

import Txt from '@ui/text/Txt'

interface ICarouselView {
	wallets?: IWallet[]
	setWallet: Dispatch<SetStateAction<IWallet | null>>
}

type ICarouselItem = ListRenderItem<IWallet> &
	((
		item: {
			item: IWallet
			index: number
		},
		parallaxProps?: AdditionalParallaxProps | undefined
	) => React.ReactNode)

const CarouselView: FC<ICarouselView> = ({ wallets, setWallet }) => {
	const { width: screenWidth } = useWindowDimensions()
	const [activeSlide, setActiveSlide] = useState<number>(0)
	const { navigate } = useTypedNavigation()

	useEffect(() => {
		if (wallets) {
			setWallet(wallets[activeSlide])
		}
	}, [activeSlide, wallets])

	const CarouselItem: ICarouselItem = (
		{ item }: { item: IWallet },
		parallaxProps?: AdditionalParallaxProps | undefined
	) => {
		return (
			<Pressable
				className='h-[200px] w-full'
				onPress={() =>
					navigate('ReviewWallet', {
						wallet: wallets ? wallets[activeSlide] : null
					})
				}
			>
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
								+item.account > 0
									? 'text-primaryGreen'
									: +item.account < 0
									? 'text-primatyRed'
									: ''
							)}
						>
							{item.account}
						</Txt>
					</View>
				</View>
			</Pressable>
		)
	}

	return (
		<View className='items-center justify-center'>
			{wallets && (
				<>
					<Carousel
						sliderWidth={screenWidth}
						sliderHeight={screenWidth}
						itemWidth={screenWidth - 35}
						data={wallets}
						// eslint-disable-next-line
						// @ts-ignore
						renderItem={CarouselItem}
						hasParallaxImages={true}
						onSnapToItem={index => setActiveSlide(index)}
					/>
					<Pagination
						dotsLength={wallets.length}
						activeDotIndex={activeSlide}
						// containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)' }}
						dotStyle={{
							width: 10,
							height: 10,
							borderRadius: 5,
							marginHorizontal: 8,
							backgroundColor: 'rgba(255, 255, 255, 0.92)'
						}}
						inactiveDotStyle={
							{
								// Define styles for inactive dots here
							}
						}
						inactiveDotOpacity={0.4}
						inactiveDotScale={0.6}
					/>
				</>
			)}
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

export default CarouselView
