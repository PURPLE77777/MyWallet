import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

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
		<View style={[styles.mainContainer]}>
			{/* <Carousel data={products} /> */}
			<Text className='text-red-600'>Wallets</Text>
		</View>
	)
}

const styles = StyleSheet.create({
	mainContainer: {
		alignItems: 'center',
		justifyContent: 'center'
	},
	text: {
		fontSize: 20
	},
	button: {
		width: 100,
		shadowColor: 'white',
		marginTop: 10
	},
	buttonInc: {
		backgroundColor: 'lime'
	},
	buttonDec: {
		backgroundColor: 'red'
	},
	buttonText: {
		textAlign: 'center',
		padding: 10
	},
	productContainer: {
		backgroundColor: '#ccc'
	},
	productView: {
		height: 50,
		flexDirection: 'row',
		justifyContent: 'space-between'
	}
})

export default WalletsScreen
