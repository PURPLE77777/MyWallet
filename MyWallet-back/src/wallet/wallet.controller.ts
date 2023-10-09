import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/decorators/auth.decorator'
import { CurrentUser } from 'src/decorators/user.decorator'
import { WalletDto } from './wallet.dto'
import { WalletService } from './wallet.service'

@Controller('wallets')
export class WalletController {
	constructor(private readonly walletService: WalletService) {}

	@Patch(':walletId')
	@Auth()
	@UsePipes(new ValidationPipe())
	update(@Param('walletId') walletId: string, @Body() dto: WalletDto) {
		return this.walletService.update(+walletId, dto)
	}

	@Get()
	@Auth()
	getWallets(@CurrentUser('id') userId: string) {
		return this.walletService.getWallets(+userId)
	}

	@Get(':wallet')
	@Auth()
	byName(@CurrentUser('id') userId: string, @Param('wallet') wallet: string) {
		return this.walletService.byName(+userId, wallet)
	}

	@Post('create')
	@Auth()
	@UsePipes(new ValidationPipe())
	create(@CurrentUser('id') userId: string, @Body() dto: WalletDto) {
		return this.walletService.create(+userId, dto)
	}

	@Delete(':walletId')
	@Auth()
	delete(
		@CurrentUser('id') userId: string,
		@Param('walletId') walletId: string
	) {
		return this.walletService.delete(+userId, +walletId)
	}
}
