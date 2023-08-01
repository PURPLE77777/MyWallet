import SettingsScreen from '@screens/settings/SettingsScreen'
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
	}
]
