import { ComponentType } from 'react'

import { ISection } from '@AppTypes/section.interface'
import { IWallet } from '@AppTypes/waller.interface'

export type RootStackParamList = {
	Wallets: undefined
	SectionsCnf: undefined
	Auth: undefined
	Profile: undefined
	Statistics: undefined
	ReviewWallet: { wallet: IWallet | null } | undefined
	SectionProfile: { section: ISection } | undefined
	// Feed: { sort: 'latest' | 'top' } | undefined;
}

export interface IRoute {
	name: keyof Omit<RootStackParamList, 'Auth'>
	component: ComponentType<any>
}

export type TypeNavigate = (name: keyof RootStackParamList) => void
