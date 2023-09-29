import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	async getWallets(userId: number) {
		const user = await this.prisma.user.findUnique({
			where: {
				id: userId
			},
			include: {
				wallets: true
			}
		})

		return user
	}
}
