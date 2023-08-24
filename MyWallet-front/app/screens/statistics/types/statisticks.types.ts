import { ITransaction } from '@AppTypes/transactions.interface'

export interface IStatisticks {
	expenses: ITransaction[]
	gains: ITransaction[]
}

export interface IStats {
	text: string
	value: number
	color: string
}
