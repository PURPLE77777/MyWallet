import { IPagination } from '@AppTypes/pagination.dto'

export interface GetAllTransactionsDto extends IPagination {
	sort?: EnumTransactionSort
	frDate?: Date
	toDate?: Date
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

export interface ITransactionResponse {
	amount: number
	walletName: string
	sectionName: string
}

export enum EnumTransactionSort {
	HIGH_AMOUNT,
	LOW_AMOUNT,
	NEWEST,
	OLDEST
}
