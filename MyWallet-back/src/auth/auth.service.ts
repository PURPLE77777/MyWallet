import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { hash, verify } from 'argon2'
import { PrismaService } from 'src/prisma.service'
import { AuthDto } from './dto/auth.dto'
import { TokenDto } from './dto/token.dto'

interface IPayload {
	id: number
}

@Injectable()
export class AuthService {
	constructor(
		private readonly prisma: PrismaService,
		private readonly jwt: JwtService
	) {}

	async register(dto: AuthDto) {
		console.log(
			new Date().toUTCString(),
			`user register: name - ${dto.name}, pass - ${dto.password}`
		)

		const oldUser = await this.prisma.user.findUnique({
			where: {
				name: dto.name
			}
		})

		if (oldUser) throw new BadRequestException('This user is already exist')

		const user = await this.prisma.user.create({
			data: {
				name: dto.name,
				password: await hash(dto.password)
			}
		})

		const tokens = this.generateTokens(user.id)

		return {
			user,
			...tokens
		}
	}

	async login(dto: AuthDto) {
		console.log(
			new Date().toUTCString(),
			`user login: name - ${dto.name}, pass - ${dto.password}`
		)

		const user = await this.prisma.user.findUnique({
			where: {
				name: dto.name
			}
			// include: {
			// 	wallets: true
			// }
		})

		if (!user)
			throw new BadRequestException(
				'Invalid the user name or the password'
			)

		const isValid = await verify(user.password, dto.password)

		if (!isValid)
			throw new BadRequestException(
				'Invalid the user name or the password'
			)

		const tokens = this.generateTokens(user.id)

		return {
			user,
			...tokens
		}
	}

	private generateTokens(userId: number) {
		const payload: IPayload = { id: userId }

		const accessToken = this.jwt.sign(payload, {
			expiresIn: '1h'
		})

		const refreshToken = this.jwt.sign(payload, {
			expiresIn: '1d'
		})

		return { accessToken, refreshToken }
	}

	async checkAuth(dto: TokenDto) {
		let result: IPayload

		try {
			result = await this.jwt.verifyAsync(dto.refreshToken)
		} catch (e) {
			console.error(e)
			throw new UnauthorizedException('Invalid refresh token')
		}

		if (!result) throw new UnauthorizedException('Invalid refresh token')

		const user = await this.prisma.user.findUnique({
			where: {
				id: result.id
			}
		})

		if (!user) throw new NotFoundException('No fonud such user')

		const tokens = this.generateTokens(user.id)

		return {
			user,
			...tokens
		}
	}
}
