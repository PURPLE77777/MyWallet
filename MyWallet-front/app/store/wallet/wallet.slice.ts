import { createSlice } from '@reduxjs/toolkit'

import { getUserWallets } from './wallet.actions'
import { IWalletInitialState } from './wallet.interface'

const initialState: IWalletInitialState = {
	wallets: null,
	error: null,
	isLoading: false
}

export const walletSlice = createSlice({
	name: 'wallet',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getUserWallets.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(getUserWallets.fulfilled, (state, { payload }) => {
				state.wallets = payload
				state.isLoading = false
			})
			.addCase(getUserWallets.rejected, (state, { payload }) => {
				state.wallets = null
				state.isLoading = false
				state.error = payload
			})
	}
})
