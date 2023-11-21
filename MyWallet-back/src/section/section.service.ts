import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { GetSectionsDto } from './dto/get-all.transactions'
import { SectionDto } from './section.dto'

@Injectable()
export class SectionService {
	constructor(private readonly prisma: PrismaService) {}

	async getAll(walletId: number, dto?: GetSectionsDto) {
		const isDtoFull = !!Object.keys(dto).length

		const sections = await this.prisma.section.findMany({
			where: {
				walletId
			},
			include: {
				transactions: isDtoFull
			}
		})

		if (!isDtoFull) return sections

		sections.forEach(section => {
			const transactions = section.transactions.filter(transaction => {
				const newToDate = new Date(dto.toDate)
				newToDate.setDate(newToDate.getDate() + 1)
				return (
					new Date(transaction.createdAt).getTime() >=
						new Date(dto.frDate).getTime() &&
					new Date(transaction.createdAt).getTime() <=
						newToDate.getTime()
				)
			})

			section.amount = transactions.reduce(
				(sum, trans) => sum + trans.amount,
				0
			)

			delete section.transactions
		})

		return sections
	}

	async byId(sectionId: number) {
		return this.prisma.section.findUnique({
			where: {
				id: sectionId
			}
		})
	}

	async add(walletId: number, dto: SectionDto) {
		const isWalletExist = await this.prisma.wallet.findUnique({
			where: {
				id: walletId
			}
		})

		if (!isWalletExist) throw new BadRequestException('No such wallet')

		const oldSection = await this.prisma.section.findFirst({
			where: {
				name: dto.name,
				walletId
			}
		})

		if (oldSection)
			throw new BadRequestException('Such section is already exist')

		const section = await this.prisma.section.create({
			data: {
				name: dto.name,
				type: dto.type,
				color: dto.color || '',
				icon: dto.icon || '',
				walletId,
				amount: 0
			}
		})

		return section
	}

	async update(sectionId: number, dto: SectionDto) {
		const section = await this.prisma.section.findFirst({
			where: {
				id: sectionId
			}
		})

		if (!section) throw new NotFoundException('Now such section')

		return this.prisma.section.update({
			where: {
				id: sectionId
			},
			data: {
				...dto
			}
		})
	}

	async delete(id: number) {
		return this.prisma.section.delete({
			where: {
				id
			}
		})
	}
}
