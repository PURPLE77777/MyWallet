import ProfileScreen from '@screens/profile/ProfileScreen'
import SettingsScreen from '@screens/settings/SettingsScreen'
import StatisticsScreen from '@screens/statistics/StatisticsScreen'
import WalletsScreen from '@screens/wallets/WalletsScreen'

import { IRoute } from './navigation.types'

export const routes: IRoute[] = [
	{
		name: 'Wallets',
		component: WalletsScreen
	},
	{
		name: 'Settings',
		component: SettingsScreen
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
