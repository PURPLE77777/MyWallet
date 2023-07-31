import { ComponentType } from 'react'

export type RootStackParamList = {
	Wallets: undefined
	Settings: undefined
	// Feed: { sort: 'latest' | 'top' } | undefined;
}

export interface IRoute {
	name: keyof RootStackParamList
	component: ComponentType
}
