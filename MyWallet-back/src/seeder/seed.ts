import { faker } from '@faker-js/faker'
import { Prisma, PrismaClient } from '@prisma/client'
import { hash } from 'argon2'
import * as dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

const createData = async (
	countUsers: number,
	countWallets: number,
	countSections: number,
	countTransactions: number
) => {
	const users: Prisma.UserCreateManyInput[] = [],
		wallets: Prisma.WalletCreateManyInput[] = [],
		sections: Prisma.SectionCreateManyInput[] = [],
		transactions: Prisma.TransactionCreateManyInput[] = [],
		sectionsExpenses = [
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
		],
		sectionsGains = [
			'Зарплата',
			'Долги',
			'Подарок',
			'Находка',
			'Другие услуги',
			'Продажи',
			'Пассивный доход',
			'Аренда'
		],
		icons = [
			{
				iconName: 'heartbeat',
				color: 'bg-red-400'
			},
			{
				iconName: 'wallet',
				color: 'bg-green-400'
			},
			{
				iconName: 'home',
				color: 'bg-blue-400'
			},
			{
				iconName: 'food-fork-drink',
				color: 'bg-yellow-400'
			},
			{
				iconName: 'hand-coin-outline',
				color: 'bg-blue-400'
			},
			{
				iconName: 'gift-outline',
				color: 'bg-pink-400'
			},
			{
				iconName: 'sack-percent',
				color: 'bg-green-400'
			}
		]

	const usersData = []

	let userId = 1,
		walletId = 1,
		sectionId = 1,
		transactionId = 1,
		dubs = []

	for (let i = 0; i < countTransactions; i++) {
		const date = faker.date.between({
			from: '2020-01-01T00:00:00.000Z',
			to: '2023-01-01T00:00:00.000Z'
		})
		const transaction: Prisma.TransactionCreateManyInput = {
			id: transactionId,
			amount: faker.number.int({
				min: 5,
				max: 2000
			}),
			walletId: faker.number.int({
				min: walletId,
				max: walletId + countWallets - 1
			}),
			sectionId: faker.number.int({
				min: sectionId,
				max: sectionId + countSections - 1
			}),
			createdAt: date,
			updatedAt: date
		}

		transactions.push(transaction)

		transactionId++
	}
	transactionId = 5

	console.log('creating sections...')
	dubs = []
	for (let i = 0; i < countSections; i++) {
		const type = Math.random() < 0.65 ? 'EXPENSE' : 'GAIN'
		const name =
			type === 'EXPENSE'
				? sectionsExpenses[
						Math.floor(Math.random() * sectionsExpenses.length)
				  ]
				: sectionsGains[
						Math.floor(Math.random() * sectionsGains.length)
				  ]

		if (dubs.includes(name)) {
			i--
			continue
		}
		dubs.push(name)

		const trans = transactions.filter(
			transaction => transaction.sectionId === sectionId
		)
		const amount = trans.reduce((prev, next) => prev + next.amount, 0)

		const sectionView = icons[Math.floor(Math.random() * icons.length)]

		const date = faker.date.between({
			from: '2020-01-01T00:00:00.000Z',
			to: '2023-01-01T00:00:00.000Z'
		})
		const section: Prisma.SectionCreateManyInput = {
			id: sectionId,
			name,
			type,
			icon: sectionView.iconName,
			color: sectionView.color,
			amount,
			walletId: faker.number.int({
				min: walletId,
				max: walletId + countWallets - 1
			}),
			createdAt: date,
			updatedAt: date
		}

		sections.push(section)

		sectionId++
	}
	sectionId = 5

	console.log('creating wallets...')
	dubs = []
	for (let i = 0; i < countWallets; i++) {
		const name = faker.word.noun()

		if (dubs.includes(name)) {
			i--
			continue
		}
		dubs.push(name)

		const secs = sections.filter(section => section.walletId === walletId)
		const account = secs.reduce(
			(prev, next) =>
				next.type === 'GAIN' ? prev + next.amount : prev - next.amount,
			0
		)

		const date = faker.date.between({
			from: '2020-01-01T00:00:00.000Z',
			to: '2023-01-01T00:00:00.000Z'
		})
		const wallet: Prisma.WalletCreateManyInput = {
			id: walletId,
			name,
			account,
			userId: faker.number.int({
				min: userId,
				max: userId + countUsers - 1
			}),
			createdAt: date,
			updatedAt: date
		}

		wallets.push(wallet)

		walletId++
	}
	walletId = 5

	console.log('creating users...')
	dubs = []
	for (let i = 0; i < countUsers; i++) {
		const name = faker.person.firstName()

		if (dubs.includes(name)) {
			i--
			continue
		}
		dubs.push(name)

		const date = faker.date.between({
			from: '2020-01-01T00:00:00.000Z',
			to: '2023-01-01T00:00:00.000Z'
		})
		const pass = faker.internet.password({ length: 10 })
		const user: Prisma.UserCreateManyInput = {
			id: userId,
			name,
			password: await hash(pass),
			createdAt: date,
			updatedAt: date
		}

		usersData.push({ name, pass })
		users.push(user)
		userId++
	}

	console.log('saving created data...')

	await prisma.user.createMany({
		data: users
	})

	await prisma.wallet.createMany({
		data: wallets
	})

	await prisma.section.createMany({
		data: sections
	})

	await prisma.transaction.createMany({
		data: transactions
	})

	console.log(usersData)
}

async function main() {
	console.log('Start seeding...')
	await createData(3, 5, 10, 80)
}

main()
	.catch(e => console.error(e))
	.finally(async () => {
		await prisma.$disconnect()
	})
