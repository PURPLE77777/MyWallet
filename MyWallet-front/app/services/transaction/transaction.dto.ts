import { IPagination } from '@AppTypes/pagination.dto'
import { ISection } from '@AppTypes/section.interface'

export interface GetAllTransactionsDto extends IPagination {
	sort?: EnumTransactionSort
	frDate?: Date
	toDate?: Date
}

export interface ITransactionResponse {
	id: number
	amount: number
	section: ISection
	createdAt: Date
}

// export interface ITransactionResponse {
// 	amount: number
// 	walletName: string
// 	sectionName: string
// }

export enum EnumTransactionSort {
	HIGH_AMOUNT,
	LOW_AMOUNT,
	NEWEST,
	OLDEST
}
