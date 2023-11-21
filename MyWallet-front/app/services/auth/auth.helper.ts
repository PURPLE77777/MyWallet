import AsyncStorage from '@react-native-async-storage/async-storage'
import { IAuthResponse, ITokens } from 'store/user/user.interface'

export const saveTokensStorage = async (data: ITokens) => {
	await AsyncStorage.setItem('accessToken', data.accessToken)
	await AsyncStorage.setItem('refreshToken', data.refreshToken)
}

export const removeFromStorage = async () => {
	await AsyncStorage.removeItem('accessToken')
	await AsyncStorage.removeItem('refreshToken')
	await AsyncStorage.removeItem('user')
}

export const getAccessToken = async () => {
	return (await AsyncStorage.getItem('accessToken')) || null
}

export const saveToStorage = async (data: IAuthResponse) => {
	saveTokensStorage(data)
	await AsyncStorage.setItem('user', JSON.stringify(data.user))
}
