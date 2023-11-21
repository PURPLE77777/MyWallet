import { IsNumber, Min } from 'class-validator'

export class TransactionDto {
	@IsNumber()
	@Min(0)
	amount: number

	@IsNumber()
	@Min(0)
	walletId: number

	@IsNumber()
	@Min(0)
	sectionId: number
}

export class TransactionUpdateDto {
	@IsNumber()
	@Min(0)
	amount: number
}
