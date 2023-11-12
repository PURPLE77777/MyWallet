import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
import { WalletDto } from './wallet.dto'

@Injectable()
export class WalletService {
	constructor(private readonly prisma: PrismaService) {}

	async create(userId: number, dto: WalletDto) {
		const oldWallet = await this.prisma.wallet.findFirst({
			where: {
				userId,
				name: dto.name
			}
		})

		if (oldWallet)
			throw new BadRequestException('Such wallet is already exist')

		return this.prisma.wallet.create({
			data: {
				name: dto.name,
				account: 0,
				userId
			}
		})
	}

	async update(walletId: number, dto: WalletDto) {
		const wallet = await this.prisma.wallet.findUnique({
			where: {
				id: walletId
			}
		})

		if (!wallet) throw new NotFoundException('No such wallet')

		return this.prisma.wallet.update({
			where: {
				id: wallet.id
			},
			data: {
				name: dto.name
			}
		})
	}

	async getWallets(userId: number) {
		console.log(
			'get wallets',
			new Date().toUTCString(),
			await this.prisma.wallet.findMany({
				where: {
					userId
				}
			})
		)

		return this.prisma.wallet.findMany({
			where: {
				userId
			}
		})
	}

	async byName(
		userId: number,
		wallet: string,
		selectProps: Prisma.WalletInclude = {}
	) {
		return this.prisma.wallet.findFirst({
			where: {
				userId,
				name: wallet
			},
			include: {
				...selectProps
			}
		})
	}

	async delete(userId: number, walletId: number) {
		const isExists = await this.prisma.wallet.findUnique({
			where: {
				userId,
				id: walletId
			}
		})

		if (!isExists) throw new BadRequestException('No such wallet')

		return this.prisma.wallet.delete({
			where: {
				id: walletId,
				userId
			}
		})
	}
}
