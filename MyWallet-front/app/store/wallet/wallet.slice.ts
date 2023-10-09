import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { IWallet } from '@AppTypes/waller.interface'

import { createWallet, getUserWallets, updateWallet } from './wallet.actions'
import { IWalletInitialState } from './wallet.interface'

const initialState: IWalletInitialState = {
	selectedWallet: null,
	wallets: null,
	error: null,
	isLoading: false
}

export const walletSlice = createSlice({
	name: 'wallet',
	initialState,
	reducers: {
		selectWallet(state, { payload }: PayloadAction<IWallet>) {
			state.selectedWallet = payload
		},
		deselectWallet(state) {
			state.selectedWallet = null
		},
		clearWallets(state) {
			state.selectedWallet = null
			state.wallets = null
		}
	},
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
			.addCase(createWallet.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(createWallet.fulfilled, (state, { payload }) => {
				state.isLoading = false
				state.wallets
					? state.wallets.push(payload)
					: (state.wallets = [payload])
			})
			.addCase(createWallet.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
			.addCase(updateWallet.pending, state => {
				state.isLoading = true
				state.error = null
			})
			.addCase(updateWallet.fulfilled, (state, { payload }) => {
				if (state.wallets) {
					const index = state.wallets?.findIndex(
						wallet => wallet.id === payload.id
					)
					index && (state.wallets[index] = payload)
				} else state.error = 'No such wallet'
				state.isLoading = false
			})
			.addCase(updateWallet.rejected, (state, { payload }) => {
				state.isLoading = false
				state.error = payload
			})
	}
})
