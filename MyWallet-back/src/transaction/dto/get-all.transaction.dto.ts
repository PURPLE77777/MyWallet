import { IsDate, IsEnum, IsOptional } from 'class-validator'
import { PaginationDto } from 'src/pagination/pagination.dto'

export enum EnumTransactionSort {
	HIGH_AMOUNT,
	LOW_AMOUNT,
	NEWEST,
	OLDEST
}

export class GetAllTransactionsDto extends PaginationDto {
	@IsOptional()
	@IsEnum(EnumTransactionSort)
	sort?: EnumTransactionSort

	@IsOptional()
	@IsDate()
	frDate?: Date

	@IsOptional()
	@IsDate()
	toDate?: Date
}
