import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import { AUTH_BASE } from '@services/path.base'

import { IAuthResponse, INamePassword } from '@store/user/user.interface'

import { instance } from '@api/api.interceptor'

import { saveToStorage } from './auth.helper'

abstract class AuthService {
	static async main(type: 'login' | 'register', data: INamePassword) {
		const response = await instance<IAuthResponse>({
			url: `${AUTH_BASE}/${type}`,
			method: 'post',
			data
		})

		if (response.data.accessToken) {
			saveToStorage(response.data)
		}

		return response.data
	}

	static async getNewTokens() {
		const refreshToken = await AsyncStorage.getItem('refresh-token')
		const response = await axios.post<string, { data: IAuthResponse }>(
			process.env.EXPO_PUBLIC_SERVER_URL + `${AUTH_BASE}login/access-token`,
			{ refreshToken }
		)

		if (response.data.accessToken) saveToStorage(response.data)

		return response.data
	}
}

export default AuthService
