import axios from 'axios'

import { getAccessToken } from '@services/auth/auth.helper'

import { errorCatch, getContentType } from './api.helper'
import { sleep } from './sleep'

export const instance = axios.create({
	baseURL: process.env.EXPO_PUBLIC_SERVER_URL,
	headers: getContentType(),
	timeout: 5000
})

instance.interceptors.request.use(
	async config => {
		const accessToken = await getAccessToken()

		if (config.headers && accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`
		}

		return config
	},
	error => {
		console.log(errorCatch(error))
		return Promise.reject(errorCatch(error))
	}
)

instance.interceptors.response.use(
	async response => {
		await sleep()
		return response
	},
	async error => {
		console.log(errorCatch(error))
		return Promise.reject(errorCatch(error))
	}
)
