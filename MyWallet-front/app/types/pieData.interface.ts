import { EnumTypeTransaction } from './section.interface'

export interface IItemData {
	name: string
	color: string
	amount: number
	icon: string
	type: EnumTypeTransaction
	percent: number
}

export interface IPieChart {
	data: IItemData[]
	size: number
}
