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

	static async updateTransaction(
		transactionId: number,
		data: ITransationRequest
	) {
		const response = await instance<ITransactionResponse>({
			url: `${TRANSACTION_BASE}/${transactionId}`,
			method: 'patch',
			data
		})

		return response.data
	}

	static async deleteTransaction(transactionId: number) {
		const response = await instance<ITransationRequest>({
			url: `${TRANSACTION_BASE}/${transactionId}`,
			method: 'delete'
		})

		return response.data
	}
}

export default TransactionService
