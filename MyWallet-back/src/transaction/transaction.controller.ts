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
import { CurrentUser } from 'src/decorators/user.decorator'
import { GetAllTransactionsDto } from './dto/get-all.transaction.dto'
import { TransactionDto } from './dto/transaction.dto'
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
		console.log(walletId)
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
	@Post('create')
	@UsePipes(new ValidationPipe())
	create(@CurrentUser('id') userId: string, @Body() dto: TransactionDto) {
		return this.transactionService.create(+userId, dto)
	}

	@Auth()
	@Patch('update/:transactionId')
	@UsePipes(new ValidationPipe())
	update(
		@Param('transactionId') transactionId: string,
		@Body() amount: Pick<TransactionDto, 'amount'>
	) {
		return this.transactionService.update(+transactionId, +amount)
	}

	@Auth()
	@Delete(':transactionId')
	delete(@Param('transactionId') transactionId: string) {
		return this.transactionService.delete(+transactionId)
	}
}
