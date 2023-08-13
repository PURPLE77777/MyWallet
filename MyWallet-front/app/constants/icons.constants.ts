import { RootStackParamList } from '@navigation/navigation.types'

import { IIcons } from '@ui/icons/icons.interface'

type IconNames = Omit<RootStackParamList, 'Auth'>

// type IconNames = Omit<RootStackParamList, 'Auth'>

export const ICONS: Record<keyof IconNames, IIcons> = {
	Wallets: 'credit-card-multiple',
	SectionsCnf: 'settings',
	Profile: 'account',
	Statistics: 'circular-graph'
}
