import { TRANSACTION_BASE } from '@services/path.base'

import { instance } from '@api/api.interceptor'

import { GetAllTransactionsDto, ITransactionResponse } from './transaction.dto'

abstract class TransactionService {
	static async getAll(walletId: number, params?: GetAllTransactionsDto) {
		const response = await instance<ITransactionResponse[]>({
			url: `${TRANSACTION_BASE}/${walletId}`,
			method: 'get',
			params
		})

		return response.data
	}
}

export default TransactionService
