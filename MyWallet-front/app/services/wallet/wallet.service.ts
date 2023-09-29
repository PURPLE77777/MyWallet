import { WALLET_BASE } from '@services/path.base'

import { IWallet } from '@AppTypes/waller.interface'

import { instance } from '@api/api.interceptor'

abstract class WalletService {
	static async getWalletsOfUser() {
		const response = await instance<IWallet[]>({
			url: WALLET_BASE,
			method: 'get'
		})

		return response.data
	}
}

export default WalletService
