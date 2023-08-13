import { useEffect, useState } from 'react'
import {
	Dimensions,
	Platform,
	StyleSheet,
	Text,
	View,
	useWindowDimensions
} from 'react-native'
import Carousel, { Pagination, ParallaxImage } from 'react-native-snap-carousel'

// import cn from 'clsx'

const ENTRIES1 = [
	{
		title: 'Beautiful and dramatic Antelope Canyon',
		subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
		illustration: 'https://i.imgur.com/UYiroysl.jpg'
	},
	{
		title: 'Earlier this morning, NYC',
		subtitle: 'Lorem ipsum dolor sit amet',
		illustration: 'https://i.imgur.com/UPrs1EWl.jpg'
	},
	{
		title: 'White Pocket Sunset',
		subtitle: 'Lorem ipsum dolor sit amet et nuncat ',
		illustration: 'https://i.imgur.com/MABUbpDl.jpg'
	},
	{
		title: 'Acrocorinth, Greece',
		subtitle: 'Lorem ipsum dolor sit amet et nuncat mergitur',
		illustration: 'https://i.imgur.com/KZsmUi2l.jpg'
	},
	{
		title: 'The lone tree, majestic landscape of New Zealand',
		subtitle: 'Lorem ipsum dolor sit amet',
		illustration: 'https://i.imgur.com/2nCt3Sbl.jpg'
	}
]
const { width: screenWidth } = Dimensions.get('window')

type ItemProps = {
	title: string
	subtitle: string
	illustration: string
}

const CarouselView = () => {
	const [entries, setEntries] = useState<ItemProps[]>([])
	const { width: screenWidth } = useWindowDimensions()
	const [activeSlide, setActiveSlide] = useState<number>(0)

	useEffect(() => {
		setEntries(ENTRIES1)
	}, [])

	const renderItem = ({ item }: { item: ItemProps }, parallaxProps) => {
		return (
			<View style={styles.item}>
				<ParallaxImage
					source={{ uri: item.illustration }}
					containerStyle={styles.imageContainer}
					style={styles.image}
					parallaxFactor={0.4}
					{...parallaxProps}
				/>
				<Text
					className='absolute left-0 top-[100px] bg-[#0000006d] text-white'
					numberOfLines={2}
				>
					{item.title}
				</Text>
			</View>
		)
	}

	return (
		<View className='items-center justify-center'>
			<Carousel
				sliderWidth={screenWidth}
				sliderHeight={screenWidth}
				itemWidth={screenWidth - 60}
				data={entries}
				// eslint-disable-next-line
				// @ts-ignore
				renderItem={renderItem}
				hasParallaxImages={true}
				onSnapToItem={index => setActiveSlide(index)}
			/>
			<Pagination
				dotsLength={entries.length}
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
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	item: {
		width: screenWidth - 60,
		height: screenWidth - 60
	},
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
