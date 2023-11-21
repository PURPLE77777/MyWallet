import clsx from 'clsx'
import { FC, useEffect, useState } from 'react'
import {
	ListRenderItem,
	Platform,
	Pressable,
	StyleSheet,
	TouchableOpacity,
	View,
	useWindowDimensions
} from 'react-native'
import Carousel, {
	AdditionalParallaxProps,
	Pagination,
	ParallaxImage
} from 'react-native-snap-carousel'

import { IWallet } from '@AppTypes/waller.interface'

import { useActions } from '@hooks/useActions'
import { useTypedNavigation } from '@hooks/useTypedNavigation'

import Icon from '@ui/icons/Icon'
import Txt from '@ui/text/Txt'

interface ICarouselView {
	wallets: IWallet[]
}

type ICarouselItem = ListRenderItem<IWallet> &
	((
		item: {
			item: IWallet
			index: number
		},
		parallaxProps?: AdditionalParallaxProps | undefined
	) => React.ReactNode)

const CarouselView: FC<ICarouselView> = ({ wallets }) => {
	const { width: screenWidth } = useWindowDimensions()
	const [activeSlide, setActiveSlide] = useState<number>(0)
	const { navigate } = useTypedNavigation()

	const { selectWallet, deselectWallet } = useActions()

	useEffect(() => {
		if (activeSlide < wallets.length) {
			selectWallet(wallets[activeSlide])
		} else {
			deselectWallet()
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
					item.id
						? navigate(
								'ReviewWallet',
								wallets
									? {
											wallet: wallets[activeSlide]
									  }
									: undefined
						  )
						: navigate('ReviewWallet')
				}
			>
				<ParallaxImage
					source={item.id && require('@assets/images/map_of_planet.jpg')}
					containerStyle={styles.imageContainer}
					style={styles.image}
					parallaxFactor={0.4}
					{...parallaxProps}
				/>
				<View className='absolute left-0 top-0 h-full w-full rounded-lg bg-black opacity-70' />

				{item.id ? (
					<>
						<View className='absolute left-4 top-1/4 w-full'>
							<Txt className='text-3xl capitalize' numberOfLines={2}>
								{item.name}
							</Txt>
							<View className='mt-5 flex-row text-2xl'>
								<Txt>Account:</Txt>
								<Txt
									className={clsx(
										'ml-4',
										+item.account > 0
											? 'text-primaryGreen'
											: +item.account < 0
											? 'text-primaryRed'
											: ''
									)}
								>
									{item.account}
								</Txt>
							</View>
						</View>
						<TouchableOpacity
							activeOpacity={0.5}
							onPress={() =>
								navigate(
									'TransactionProfile',
									// eslint-disable-next-line
									// @ts-ignore
									wallets
										? {
												wallet: wallets[activeSlide]
										  }
										: undefined
								)
							}
							className='absolute bottom-3 right-3 h-[40px] w-[40px] items-center justify-center rounded-full bg-[#facc14]'
						>
							<Icon name={'plus'} size={40} />
						</TouchableOpacity>
					</>
				) : (
					<View className='h-full items-center justify-center rounded-lg bg-primaryLightGray text-center align-middle'>
						<Icon name={'plus'} color='white' size={100} />
					</View>
				)}
			</Pressable>
		)
	}

	return (
		<View className='h-[230px]'>
			<>
				<Carousel
					sliderWidth={screenWidth}
					itemWidth={screenWidth - 35}
					data={wallets.concat({
						id: 0,
						account: 0,
						name: ''
					})}
					// eslint-disable-next-line
					// @ts-ignore
					renderItem={CarouselItem}
					hasParallaxImages={true}
					onSnapToItem={index => setActiveSlide(index)}
				/>
				<Pagination
					dotsLength={wallets.length + 1}
					activeDotIndex={activeSlide}
					containerStyle={{
						paddingVertical: 0,
						top: 0
					}}
					// dotContainerStyle={{
					// 	height: 0,
					// 	width: 0
					// }}
					dotStyle={{
						width: 10,
						height: 10,
						borderRadius: 5,
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
