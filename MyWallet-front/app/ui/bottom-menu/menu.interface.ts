// import { RootStackParaamList } from 'navigation/navigation.types'
import { RootStackParaamList } from '@navigation/navigation.types'
import { IconType } from 'react-icons'
// import * as Heroicons2 from 'react-icons/hi2'
// import * as AntDesignIcons from 'react-icons/ai'

// type Icons = keyof typeof Heroicons2 | keyof typeof AntDesignIcons

export interface IMenuItemData {
	path: keyof RootStackParaamList
	// iconName: Icons
	iconName: IconType
}
