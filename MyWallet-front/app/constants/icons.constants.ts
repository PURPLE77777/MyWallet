import { IIcons } from '@ui/icons/icons.interface'

// type IconNames = Omit<RootStackParamList, 'Auth'>

type IconNames = 'Wallets' | 'Settings' | 'Profile' | 'Statistics'

export const ICONS: Record<IconNames, IIcons> = {
	Wallets: 'credit-card-multiple',
	Settings: 'settings',
	Profile: 'account',
	Statistics: 'sliders'
}
