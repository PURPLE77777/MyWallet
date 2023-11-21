import AsyncStorage from '@react-native-async-storage/async-storage'

export const getFromLocalStorage = async (name: string) => {
	const is = await AsyncStorage.getItem(name)
	return is ? JSON.parse(is) : null
}
