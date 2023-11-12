import { EnumTypeTransaction } from '@prisma/client'
import { IsEnum, IsOptional, IsString } from 'class-validator'

export class SectionDto {
	@IsString()
	name: string

	@IsEnum(EnumTypeTransaction)
	type: EnumTypeTransaction

	@IsOptional()
	@IsString()
	icon?: string

	@IsOptional()
	@IsString()
	color: string
}
