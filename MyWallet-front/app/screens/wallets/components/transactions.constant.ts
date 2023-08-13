interface ITransaction {
	id: string
	amount: number
}

export interface ITransactionsData {
	date: Date
	gains: ITransaction[]
	expenses: ITransaction[]
}

const getRandomNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

const generateRandomAmount = () => {
	return getRandomNumber(10, 1000)
}

const generateUniqueId = () => {
	return Math.random().toString().slice(2, 9)
}

const generateRandomDate = () => {
	const start = new Date(2022, 0, 1)
	const end = new Date(2022, 11, 31)
	const randomDate = new Date(
		start.getTime() + Math.random() * (end.getTime() - start.getTime())
	).setHours(0, 0, 0)
	return new Date(randomDate)
}

const TRANSACTIONS_BY_DAY: ITransactionsData[] = [],
	countTransactions = getRandomNumber(10, 30),
	countAmounts = getRandomNumber(2, 10)

for (let i = 0; i < countTransactions; i++) {
	const gains: ITransaction[] = []
	const expenses: ITransaction[] = []

	for (let j = 0; j < countAmounts; j++) {
		gains.push({ id: generateUniqueId(), amount: generateRandomAmount() })
		expenses.push({ id: generateUniqueId(), amount: generateRandomAmount() })
	}

	const newTrans: ITransactionsData = {
		date: generateRandomDate(),
		gains,
		expenses
	}

	TRANSACTIONS_BY_DAY.push(newTrans)
}

export default TRANSACTIONS_BY_DAY
