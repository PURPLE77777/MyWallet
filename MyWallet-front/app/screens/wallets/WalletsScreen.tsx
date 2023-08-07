import AsyncStorage from '@react-native-async-storage/async-storage'
import { useRoute } from '@react-navigation/native'
import { useState } from 'react'
import { Text, View } from 'react-native'

import Layout from '@ui/layout/Layout'

interface IProduct {
	id: number
	title: string
	price: number
	category: string
	description: string
	image: string
}

const WalletsScreen = () => {
	const [products, setProducts] = useState<IProduct[]>([])

	const route = useRoute()

	// const goAddSection = () => {
	// 	navigation.navigate('AddSection')
	// }

	const loadAccount = async () => {
		try {
			const value = await AsyncStorage.getItem('@storage_Key')
			if (value !== null) {
				console.log(value)
			} else {
				console.log('data is null')
			}
		} catch (e) {
			console.log('loadAccount: failed load account\n' + e)
		}
	}

	// useEffect(() => {
	// 	fetch('https://fakestoreapi.com/products_f?limit=5')
	// 		.then(res => res.json())
	// 		.then(json => {
	// 			setProducts(json)
	// 			loadAccount()
	// 		})
	// 		.catch(() => {
	// 			console.log('error of getting data')
	// 		})
	// }, [])

	return (
		<Layout title={route.name}>
			<View>
				{/* <Carousel data={products} /> */}
				<Text className='text-red-600'>{route.name}</Text>
			</View>
		</Layout>
	)
}

export default WalletsScreen
