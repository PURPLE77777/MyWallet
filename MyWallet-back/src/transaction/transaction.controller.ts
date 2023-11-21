import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Query,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/decorators/auth.decorator'
import { GetAllTransactionsDto } from './dto/get-all.transaction.dto'
import { TransactionDto, TransactionUpdateDto } from './dto/transaction.dto'
import { TransactionService } from './transaction.service'

@Controller('transactions')
export class TransactionController {
	constructor(private readonly transactionService: TransactionService) {}

	@Auth()
	@Get(':walletId')
	getAll(
		@Param('walletId') walletId: string,
		@Query() dto: GetAllTransactionsDto
	) {
		return this.transactionService.getAll(+walletId, dto)
	}

	@Auth()
	@Get('by-section/:walletId/:sectionId')
	bySection(
		@Param()
		{ walletId, sectionId }: { walletId: string; sectionId: string }
	) {
		return this.transactionService.bySection(+walletId, +sectionId)
	}

	@Auth()
	@Get('by-id/:transactionId')
	byId(@Param('transactionId') transactionId: string) {
		return this.transactionService.byId(+transactionId)
	}

	@Auth()
	@Post()
	@UsePipes(new ValidationPipe())
	create(@Body() dto: TransactionDto) {
		return this.transactionService.create(dto)
	}

	@Auth()
	@Patch(':transactionId')
	@UsePipes(new ValidationPipe())
	update(
		@Param('transactionId') transactionId: string,
		@Body() dto: TransactionUpdateDto
	) {
		return this.transactionService.update(+transactionId, dto)
	}

	@Auth()
	@Delete(':transactionId')
	delete(@Param('transactionId') transactionId: string) {
		return this.transactionService.delete(+transactionId)
	}
}
