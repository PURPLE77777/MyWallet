import { ComponentType } from 'react'

export type RootStackParamList = {
	Wallets: undefined
	SectionsCnf: undefined
	Auth: undefined
	Profile: undefined
	Statistics: undefined
	// Feed: { sort: 'latest' | 'top' } | undefined;
}

export interface IRoute {
	name: keyof Omit<RootStackParamList, 'Auth'>
	component: ComponentType
}

export type TypeNavigate = (name: keyof RootStackParamList) => void
