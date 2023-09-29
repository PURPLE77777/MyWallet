import { createAsyncThunk } from '@reduxjs/toolkit'

import AuthService from '@services/auth/auth.service'
import { AUTH_BASE } from '@services/path.base'

import { IAuthResponse, INamePassword } from './user.interface'

export const register = createAsyncThunk<IAuthResponse, INamePassword>(
	`${AUTH_BASE}/register`,
	async (data, { rejectWithValue }) => {
		try {
			const response = await AuthService.main('register', data)
			return response
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const login = createAsyncThunk<IAuthResponse, INamePassword>(
	`${AUTH_BASE}/login`,
	async (data, { rejectWithValue }) => {
		try {
			const response = await AuthService.main('login', data)
			return response
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const checkAuth = createAsyncThunk<IAuthResponse>(
	`${AUTH_BASE}/check-auth`,
	async (_, { rejectWithValue }) => {
		try {
			const response = await AuthService.getNewTokens()
			return response
		} catch (error) {
			// if (errorCatch(error) === 'jwt expired') {
			// 	// thunkApi.dispatch(logout())
			// 	removeFromStorage()
			// }

			return rejectWithValue(error)
		}
	}
)
