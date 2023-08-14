import {
	ITransaction,
	ITransactionsData
} from '@AppTypes/transactions.interface'

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

const sectionsExpenses = [
	'Продукты',
	'Кафе',
	'Транспорт',
	'Кредит',
	'Одежда',
	'Квартира',
	'Телефон',
	'Лекартсва',
	'Путешествие',
	'Косметика'
]
const getRandomExpenseSection = () => {
	const randomIndex = Math.floor(Math.random() * sectionsExpenses.length)
	return sectionsExpenses[randomIndex]
}

const sectionsGains = [
	'Зарплата',
	'Долги',
	'Подарок',
	'Находка',
	'Другие услуги',
	'Продажи',
	'Пассивный доход',
	'Аренда'
]
const getRandomGainSection = () => {
	const randomIndex = Math.floor(Math.random() * sectionsGains.length)
	return sectionsGains[randomIndex]
}

const getRandomColor = (): string => {
	const letters = '0123456789ABCDEF'
	let color = '#'
	for (let i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]
	}
	return color
}

export const generateRandomTransactionData = () => {
	const transactions: ITransactionsData[] = [],
		countTransactions = getRandomNumber(5, 15),
		countAmounts = getRandomNumber(2, 6),
		allGains: ITransaction[] = [],
		allExpenses: ITransaction[] = []

	for (let i = 0; i < countTransactions; i++) {
		const gains: ITransaction[] = []
		const expenses: ITransaction[] = []

		for (let j = 0; j < countAmounts; j++) {
			gains.push({
				id: generateUniqueId(),
				amount: generateRandomAmount(),
				section: getRandomGainSection(),
				color: getRandomColor()
			})
			expenses.push({
				id: generateUniqueId(),
				amount: generateRandomAmount(),
				section: getRandomExpenseSection(),
				color: getRandomColor()
			})
		}

		allGains.push(...gains)
		allExpenses.push(...expenses)

		const newTrans: ITransactionsData = {
			date: generateRandomDate(),
			gains,
			expenses
		}

		transactions.push(newTrans)
	}
	return {
		sectionsExpenses,
		sectionsGains,
		allGains,
		allExpenses,
		transactions
	}
}

// export const EXPENSES_SECTIONS = sectionsExpenses
// export const GAINS_SECTIONS = sectionsGains
// export const GAINS = allGains
// export const EXPENSES = allExpenses
// export const TRANSACTIONS_BY_DAY = transactions
