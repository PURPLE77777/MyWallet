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

	@Auth()
	@Patch(':walletId')
	@UsePipes(new ValidationPipe())
	update(@Param('walletId') walletId: string, @Body() dto: WalletDto) {
		return this.walletService.update(+walletId, dto)
	}

	@Auth()
	@Get()
	getWallets(@CurrentUser('id') userId: string) {
		return this.walletService.getWallets(+userId)
	}

	@Auth()
	@Get(':wallet')
	byName(@CurrentUser('id') userId: string, @Param('wallet') wallet: string) {
		return this.walletService.byName(+userId, wallet)
	}

	@Auth()
	@Post('create')
	@UsePipes(new ValidationPipe())
	create(@CurrentUser('id') userId: string, @Body() dto: WalletDto) {
		return this.walletService.create(+userId, dto)
	}

	@Auth()
	@Delete(':walletId')
	delete(
		@CurrentUser('id') userId: string,
		@Param('walletId') walletId: string
	) {
		return this.walletService.delete(+userId, +walletId)
	}
}
