import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { RootStackParamList } from '@navigation/navigation.types'

export interface IWallet extends IWalletNameAccount {
	id: number
}

export type ReviewWalletType = NativeStackScreenProps<
	RootStackParamList,
	'ReviewWallet'
>

export interface IWalletNameAccount {
	name: string
	account: number
}

export type IWalletName = Pick<IWallet, 'name'>
