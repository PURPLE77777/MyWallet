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

export const EXPENSES_ICONS = [
	{
		sectionName: 'Health',
		iconName: 'heartbeat',
		color: 'bg-red-400'
	},
	{
		sectionName: 'Routine',
		iconName: 'wallet',
		color: 'bg-green-400'
	},
	{
		sectionName: 'Home',
		iconName: 'home',
		color: 'bg-blue-400'
	},
	{
		sectionName: 'Food',
		iconName: 'food-fork-drink',
		color: 'bg-yellow-400'
	}
]

export const GAINS_ICONS = [
	{
		sectionName: 'Salary',
		iconName: 'hand-coin-outline',
		color: 'bg-blue-400'
	},
	{
		sectionName: 'Gift',
		iconName: 'gift-outline',
		color: 'bg-pink-400'
	},
	{
		sectionName: 'Investment',
		iconName: 'sack-percent',
		color: 'bg-green-400'
	}
]
