import { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import { View, useWindowDimensions } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'

import { IWallet } from '@AppTypes/waller.interface'

import CarouselItem from './CarouselItem'

interface ICarouselView {
	wallets?: IWallet[]
	setWallet: Dispatch<SetStateAction<IWallet | null>>
}

const CarouselView: FC<ICarouselView> = ({ wallets, setWallet }) => {
	const { width: screenWidth } = useWindowDimensions()
	const [activeSlide, setActiveSlide] = useState<number>(0)

	useEffect(() => {
		if (wallets) setWallet(wallets[activeSlide])
	}, [activeSlide])

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

export default CarouselView
