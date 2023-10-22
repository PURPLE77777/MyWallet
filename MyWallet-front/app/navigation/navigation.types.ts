import { ComponentType } from 'react'

import { EnumTypeTransaction, ISection } from '@AppTypes/section.interface'
import { IWallet } from '@AppTypes/waller.interface'

export type RootStackParamList = {
	Wallets: undefined
	SectionsCnf: undefined
	Auth: undefined
	Profile: undefined
	Statistics: undefined
	ReviewWallet: { wallet: IWallet | null } | undefined
	SectionProfile: { section: ISection | null; sectionType: EnumTypeTransaction }
}

export interface IRoute {
	name: keyof Omit<RootStackParamList, 'Auth'>
	component: ComponentType<any>
}

export type TypeNavigate = (name: keyof RootStackParamList) => void
