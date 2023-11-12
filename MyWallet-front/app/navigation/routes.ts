import ProfileScreen from '@screens/profile/ProfileScreen'
import ReviewWalletScreen from '@screens/reviewWallet/ReviewWalletScreen'
import SectionProfileScreen from '@screens/sectionProfile/SectionProfileScreen'
import SectionsScreen from '@screens/sections/SectionsScreen'
import StatisticsScreen from '@screens/statistics/StatisticsScreen'
import TransactionProfileScreen from '@screens/transactionProfile/TransactionProfileScreen'
import WalletsScreen from '@screens/wallets/WalletsScreen'

import { IRoute } from './navigation.types'

export const routes: IRoute[] = [
	{
		name: 'Wallets',
		component: WalletsScreen
	},
	{
		name: 'SectionsCnf',
		component: SectionsScreen
	},
	{
		name: 'Profile',
		component: ProfileScreen
	},
	{
		name: 'Statistics',
		component: StatisticsScreen
	},
	{
		name: 'ReviewWallet',
		component: ReviewWalletScreen
	},
	{
		name: 'SectionProfile',
		component: SectionProfileScreen
	},
	{
		name: 'TransactionProfile',
		component: TransactionProfileScreen
	}
]
