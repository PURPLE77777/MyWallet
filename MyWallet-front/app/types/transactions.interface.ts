import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamList } from '@navigation/navigation.types'

export interface ITransaction {
	id: number
	amount: number
	section: string
	createdAt: Date
}

export interface ITransactionsData {
	id: number
	amount: number
	section: {
		type: string
		name: string
		icon: string
		color: string
	}
	createdAt: Date
}

export type TransactionProfileType = NativeStackScreenProps<
	RootStackParamList,
	'TransactionProfile'
>
