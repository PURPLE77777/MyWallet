import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamList } from '@navigation/navigation.types'

export interface ISection {
	id: number
	name: string
	type: EnumTypeTransaction
	amount: number
	icon: string
	color: string
}

export enum EnumTypeTransaction {
	GAIN = 'GAIN',
	EXPENSE = 'EXPENSE'
}

export type SectionProfileType = NativeStackScreenProps<
	RootStackParamList,
	'SectionProfile'
>
