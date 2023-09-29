import { IsNumber, IsString, Min, MinLength } from 'class-validator'

export class TransactionDto {
	@IsNumber()
	@Min(1)
	amount: number

	@IsString()
	@MinLength(1)
	wallet: string

	@IsString()
	@MinLength(1)
	section: string
}
