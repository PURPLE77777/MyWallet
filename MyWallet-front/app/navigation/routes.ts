import ProfileScreen from '@screens/profile/ProfileScreen'
import SectionsScreen from '@screens/sections/SectionsScreen'
import StatisticsScreen from '@screens/statistics/StatisticsScreen'
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
	}
]
