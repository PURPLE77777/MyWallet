import { WALLET_BASE } from '@services/path.base'

import { IWallet, IWalletNameAccount } from '@AppTypes/waller.interface'

import { instance } from '@api/api.interceptor'
import { sleep } from '@api/sleep'

abstract class WalletService {
	static async getWalletsOfUser() {
		await sleep()
		const response = await instance<IWallet[]>({
			url: WALLET_BASE,
			method: 'get'
		})

		return response.data
	}

	static async createWallet(data: IWalletNameAccount) {
		const response = await instance<IWallet>({
			url: `${WALLET_BASE}/create`,
			method: 'post',
			data
		})

		return response.data
	}

	static async updateWallet(walletId: number, data: IWalletNameAccount) {
		const response = await instance<IWallet>({
			url: `${WALLET_BASE}/${walletId}`,
			method: 'patch',
			data
		})

		return response.data
	}
}

export default WalletService
