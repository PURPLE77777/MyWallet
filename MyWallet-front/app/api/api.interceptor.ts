import axios from 'axios'

import { getAccessToken } from '@services/auth/auth.helper'

import { errorCatch, getContentType } from './api.helper'

export const instance = axios.create({
	baseURL: process.env.EXPO_PUBLIC_SERVER_URL,
	headers: getContentType()
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
	response => response,
	async error => {
		console.log(errorCatch(error))
		return Promise.reject(errorCatch(error))
	}
)
