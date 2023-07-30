import { ComponentType } from 'react'

export type RootStackParaamList = {
	Wallets: undefined
	Settings: undefined
	// Feed: { sort: 'latest' | 'top' } | undefined;
}
export interface IRoute {
	name: keyof RootStackParaamList
	component: ComponentType
}
