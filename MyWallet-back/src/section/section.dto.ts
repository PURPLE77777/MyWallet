import { EnumTypeTransaction } from '@prisma/client'
import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator'

export class SectionDto {
	@IsString()
	name: string

	@IsEnum(EnumTypeTransaction)
	type: EnumTypeTransaction

	@IsNumber()
	@Min(0)
	@IsOptional()
	amount?: number

	@IsOptional()
	@IsString()
	icon?: string

	@IsOptional()
	@IsString()
	color: string
}
