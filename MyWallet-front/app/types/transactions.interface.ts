export interface ITransaction {
	id: string
	amount: number
	section: string
	color: string
}

export interface ITransactionsData {
	date: Date
	gains: ITransaction[]
	expenses: ITransaction[]
}
