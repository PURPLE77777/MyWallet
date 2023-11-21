import { IsString, MinLength } from 'class-validator'

export class WalletDto {
	@IsString()
	@MinLength(1, {
		message: 'The name must consist of at least 3 symbol'
	})
	name: string
}
