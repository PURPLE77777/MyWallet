import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class SectionService {
	constructor(private readonly prisma: PrismaService) {}

	async addSection() {
		return 'add section'
	}
}
