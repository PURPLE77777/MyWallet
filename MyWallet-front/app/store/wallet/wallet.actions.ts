import { createAsyncThunk } from '@reduxjs/toolkit'

import { WALLET_BASE } from '@services/path.base'
import WalletService from '@services/wallet/wallet.service'

import { IWallet, IWalletNameAccount } from '@AppTypes/waller.interface'

export const getUserWallets = createAsyncThunk<IWallet[]>(
	WALLET_BASE,
	async (_, { rejectWithValue }) => {
		try {
			const response = await WalletService.getWalletsOfUser()
			return response
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const createWallet = createAsyncThunk<IWallet, IWalletNameAccount>(
	`${WALLET_BASE}/create`,
	async (data, { rejectWithValue }) => {
		try {
			const response = await WalletService.createWallet(data)
			return response
		} catch (error) {
			return rejectWithValue(error)
		}
	}
)

export const updateWallet = createAsyncThunk<
	IWallet,
	{ id: number } & IWalletNameAccount
>(`${WALLET_BASE}/update`, async (data, { rejectWithValue }) => {
	try {
		const response = await WalletService.updateWallet(data.id, data)
		return response
	} catch (error) {
		return rejectWithValue(error)
	}
})
