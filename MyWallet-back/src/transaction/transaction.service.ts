import { BadRequestException, Injectable } from '@nestjs/common'
import { EnumTypeTransaction, Prisma } from '@prisma/client'
import { PaginationService } from 'src/pagination/pagination.service'
import { PrismaService } from 'src/prisma.service'
import {
	EnumTransactionSort,
	GetAllTransactionsDto
} from './dto/get-all.transaction.dto'
import { TransactionDto, TransactionUpdateDto } from './dto/transaction.dto'

@Injectable()
export class TransactionService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService
	) {}

	async getAll(walletId: number, dto: GetAllTransactionsDto) {
		const { sort, frDate, toDate } = dto
		console.log(frDate, toDate)
		const prismaSort: Prisma.TransactionOrderByWithRelationInput[] = []

		switch (sort) {
			case EnumTransactionSort.HIGH_AMOUNT:
				prismaSort.push({ amount: 'desc' })
				break
			case EnumTransactionSort.LOW_AMOUNT:
				prismaSort.push({ amount: 'asc' })
				break
			case EnumTransactionSort.OLDEST:
				prismaSort.push({ createdAt: 'asc' })
				break
			default:
				prismaSort.push({ createdAt: 'desc' })
				break
		}

		const { perPage, skip } = this.paginationService.getPagination(dto)

		const newToDate = new Date(toDate)

		newToDate.setDate(newToDate.getDate() + 1)

		const trans = await this.prisma.transaction.findMany({
			where: {
				walletId,
				createdAt: {
					gte: frDate,
					lt: newToDate
				}
			},
			orderBy: prismaSort,
			skip,
			take: perPage,
			include: {
				section: {
					select: {
						type: true,
						name: true,
						color: true,
						icon: true
					}
				}
			}
		})

		console.log(trans)

		return trans
	}

	async bySection(walletId: number, sectionId: number) {
		return this.prisma.transaction.findMany({
			where: {
				walletId,
				sectionId
			}
		})
	}

	async byId(transactionId: number) {
		return this.prisma.transaction.findUnique({
			where: {
				id: transactionId
			}
		})
	}

	async create({ amount, sectionId, walletId }: TransactionDto) {
		const wallet = await this.prisma.wallet.findFirst({
			where: {
				id: walletId
			},
			include: {
				sections: {
					where: {
						id: sectionId
					}
				}
			}
		})

		if (!wallet || !wallet.sections.length) {
			throw new BadRequestException(
				`Cannot create transaction into: wallet - '${walletId}', section - '${sectionId}'`
			)
		}

		const newTransaction = await this.prisma.transaction.create({
			data: {
				amount: amount,
				walletId: walletId,
				sectionId: sectionId
			},
			include: {
				wallet: {
					select: {
						name: true
					}
				},
				section: {
					select: {
						name: true
					}
				}
			}
		})

		await this.updateSectionAccount(sectionId)

		await this.updateWalletAccount(walletId)

		return {
			amount: newTransaction.amount,
			walletName: newTransaction.wallet.name,
			sectionName: newTransaction.section.name
		}
	}

	// update amount of section
	async updateSectionAccount(sectionId: number) {
		const { _sum: sectionTransSum } =
			await this.prisma.transaction.aggregate({
				where: {
					sectionId
				},
				_sum: {
					amount: true
				}
			})

		await this.prisma.section.update({
			where: {
				id: sectionId
			},
			data: {
				amount: sectionTransSum.amount
			}
		})
	}

	// update account of wallet
	async updateWalletAccount(walletId: number) {
		const sections = await this.prisma.section.findMany({
			where: {
				walletId
			}
		})

		const expense = sections
			.filter(section => section.type === EnumTypeTransaction.EXPENSE)
			.reduce((sum, section) => sum + section.amount, 0)

		const gain = sections
			.filter(section => section.type === EnumTypeTransaction.GAIN)
			.reduce((sum, section) => sum + section.amount, 0)

		await this.prisma.wallet.update({
			where: {
				id: walletId
			},
			data: {
				account: gain - expense
			}
		})
	}

	async update(transactionId: number, dto: TransactionUpdateDto) {
		const transaction = await this.prisma.transaction.findUnique({
			where: {
				id: transactionId
			}
		})

		if (!transaction) throw new BadRequestException('No such transaction')

		const updatedTransaction = await this.prisma.transaction.update({
			where: {
				id: transactionId
			},
			data: {
				...dto
			}
		})

		await this.updateSectionAccount(transaction.sectionId)
		await this.updateWalletAccount(transaction.walletId)

		return updatedTransaction
	}

	async delete(transactionId: number) {
		const transaction = await this.prisma.transaction.findUnique({
			where: {
				id: transactionId
			}
		})

		if (!transaction) throw new BadRequestException('No such transaction')

		const deletedTransaction = await this.prisma.transaction.delete({
			where: {
				id: transactionId
			}
		})

		await this.updateSectionAccount(transaction.sectionId)
		await this.updateWalletAccount(transaction.walletId)

		return deletedTransaction
	}
}
