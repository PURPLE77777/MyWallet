import { ComponentType } from 'react'

import { ITransactionResponse } from '@services/transaction/transaction.dto'

import { EnumTypeTransaction, ISection } from '@AppTypes/section.interface'
import { IWallet } from '@AppTypes/waller.interface'

export type RootStackParamList = {
	Wallets: undefined
	SectionsCnf: undefined
	Auth: undefined
	Profile: undefined
	Statistics: undefined
	ReviewWallet: { wallet: IWallet } | undefined
	SectionProfile: { section?: ISection; sectionType: EnumTypeTransaction }
	TransactionProfile: { wallet: IWallet; transaction?: ITransactionResponse }
}

export interface IRoute {
	name: keyof Omit<RootStackParamList, 'Auth'>
	component: ComponentType<any>
}

export type TypeNavigate = (name: keyof RootStackParamList) => void
