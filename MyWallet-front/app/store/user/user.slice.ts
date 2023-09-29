import { createSlice } from '@reduxjs/toolkit'

import { removeFromStorage } from '@services/auth/auth.helper'

import { login, register } from './user.actions'
import { IInitialState, IUserError } from './user.interface'

const initialState: IInitialState = {
	user: null,
	isLoading: false,
	error: null
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout(state) {
			state.user = null
			removeFromStorage()
		}
	},
	extraReducers(builder) {
		builder
			.addCase(login.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(login.fulfilled, (state, { payload }) => {
				state.user = payload.user
				state.isLoading = false
			})
			.addCase(login.rejected, (state, { payload }) => {
				state.user = null
				state.isLoading = false
				state.error = payload as IUserError
			})
			.addCase(register.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(register.fulfilled, (state, { payload }) => {
				state.user = payload.user
				state.isLoading = false
			})
			.addCase(register.rejected, (state, { payload }) => {
				state.user = null
				state.isLoading = false
				state.error = payload as IUserError
			})
	}
})
