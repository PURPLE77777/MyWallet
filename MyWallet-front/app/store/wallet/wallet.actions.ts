import { createAsyncThunk } from '@reduxjs/toolkit'

import { WALLET_BASE } from '@services/path.base'
import WalletService from '@services/wallet/wallet.service'

import { IWallet } from '@AppTypes/waller.interface'

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
