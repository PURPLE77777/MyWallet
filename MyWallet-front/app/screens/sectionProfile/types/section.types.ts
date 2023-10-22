import { EnumTypeTransaction } from '@AppTypes/section.interface'

export interface ISectionRequest {
	name: string
	type: EnumTypeTransaction
	amount?: string
	icon?: string
	color?: string
}
