import { EnumTypeTransaction } from '@AppTypes/section.interface'

export interface ISectionRequest {
	name: string
	type: EnumTypeTransaction
	icon?: string
	color?: string
}
