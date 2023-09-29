import { IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator'

export class WalletDto {
	@IsString()
	@MinLength(1, {
		message: 'The name must consist of at least 3 symbol'
	})
	name: string

	@IsNumber()
	@Min(0)
	@IsOptional()
	account?: number
}
