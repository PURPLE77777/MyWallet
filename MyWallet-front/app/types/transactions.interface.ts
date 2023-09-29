export interface ITransaction {
	id: number
	amount: number
	section: string
	createdAt: Date
	// color: string
}

export interface ITransactionsData {
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
