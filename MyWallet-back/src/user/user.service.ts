import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { hash, verify } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { LogUserDto, RegUserDto } from './user.dto'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService) {}

	getAllUsers() {
		return this.prisma.user.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				password: true,
				wallets: true,
				sections: true,
				createdAt: true,
				updatedAt: true
			}
		})
	}

	async register(dto: RegUserDto) {
		const oldUser = await this.prisma.user.findFirst({
			where: {
				email: dto.email
			}
		})

		if (oldUser) throw new BadRequestException('Such user is already exist')

		return this.prisma.user.create({
			data: {
				name: dto.name,
				email: dto.email,
				password: await hash(dto.password)
			}
		})
	}

	async login(dto: LogUserDto) {
		return this.validateUser(dto)
	}

	private async validateUser(dto: LogUserDto) {
		const user = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		})

		if (!user)
			throw new NotFoundException('Such user is not exist, please register')

		const isValid = await verify(user.password, dto.password)

		if (!isValid) throw new BadRequestException('Invalid email or passsword')

		return user
	}
}
