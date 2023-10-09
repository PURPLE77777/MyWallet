import { IPagination } from '@AppTypes/pagination.dto'

export interface GetAllTransactionsDto extends IPagination {
	sort?: EnumTransactionSort
}

export interface ITransactionResponse {
	id: number
	amount: number
	section: {
		type: string
		name: string
		icon: string
		color: string
	}
	createdAt: Date
}

export enum EnumTransactionSort {
	HIGH_AMOUNT,
	LOW_AMOUNT,
	NEWEST,
	OLDEST
}