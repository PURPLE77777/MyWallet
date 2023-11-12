import { TRANSACTION_BASE } from '@services/path.base'

import { ITransationRequest } from '@screens/transactionProfile/types/transaction.types'

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

	static async addTransaction(data: ITransationRequest) {
		const response = await instance<ITransactionResponse>({
			url: `${TRANSACTION_BASE}`,
			method: 'post',
			data
		})

		return response.data
	}
}

export default TransactionService
