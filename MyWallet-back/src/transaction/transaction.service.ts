import { BadRequestException, Injectable } from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PaginationService } from 'src/pagination/pagination.service'
import { PrismaService } from 'src/prisma.service'
import {
	EnumTransactionSort,
	GetAllTransactionsDto
} from './dto/get-all.transaction.dto'
import { TransactionDto } from './dto/transaction.dto'

@Injectable()
export class TransactionService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly paginationService: PaginationService
	) {}

	async getAll(walletId: number, dto: GetAllTransactionsDto) {
		const { sort } = dto

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

		console.log(
			'get all transactions:',
			await this.prisma.transaction.findMany({
				where: {
					walletId
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
		)

		return this.prisma.transaction.findMany({
			where: {
				walletId
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

	async create(userId: number, dto: TransactionDto) {
		const wallet = await this.prisma.wallet.findFirst({
			where: {
				name: dto.wallet,
				userId
			},
			include: {
				sections: {
					where: {
						name: dto.section
					}
				}
			}
		})

		if (!wallet || !wallet.sections.length)
			throw new BadRequestException(
				`Cannot create transaction into: wallet - '${dto.wallet}', section - '${dto.section}'`
			)

		return this.prisma.transaction.create({
			data: {
				amount: dto.amount,
				walletId: wallet.id,
				sectionId: wallet.sections[0].id
			}
		})
	}

	async update(transactionId: number, amount: number) {
		return this.prisma.transaction.update({
			where: {
				id: transactionId
			},
			data: {
				amount: amount
			}
		})
	}

	async delete(transactionId: number) {
		return this.prisma.transaction.delete({
			where: {
				id: transactionId
			}
		})
	}
}
