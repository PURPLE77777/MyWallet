import { Module } from '@nestjs/common'
import { PaginationService } from 'src/pagination/pagination.service'
import { PrismaService } from 'src/prisma.service'
import { TransactionController } from './transaction.controller'
import { TransactionService } from './transaction.service'

@Module({
	controllers: [TransactionController],
	providers: [TransactionService, PrismaService, PaginationService]
})
export class TransactionModule {}
