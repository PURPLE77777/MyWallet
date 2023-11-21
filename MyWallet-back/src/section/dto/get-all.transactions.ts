import { IsOptional, IsDate } from 'class-validator'

export class GetSectionsDto {
	@IsOptional()
	@IsDate()
	frDate?: Date

	@IsOptional()
	@IsDate()
	toDate?: Date
}
