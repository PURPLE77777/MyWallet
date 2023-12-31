import { RootStackParamList } from '@navigation/navigation.types'

import { IIcons } from '@ui/icons/icons.interface'

type IconNames = Omit<RootStackParamList, 'Auth'>

// type IconNames = Omit<RootStackParamList, 'Auth'>

type OmitTypes = 'ReviewWallet' | 'SectionProfile' | 'TransactionProfile'

export const ICONS: Omit<Record<keyof IconNames, IIcons>, OmitTypes> = {
	Wallets: 'credit-card-multiple',
	SectionsCnf: 'grid',
	Profile: 'account',
	Statistics: 'piechart'
}

export const EXPENSES_ICONS = ['heartbeat', 'wallet', 'home', 'food-fork-drink']

export const GAINS_ICONS = ['hand-coin-outline', 'gift-outline', 'sack-percent']
