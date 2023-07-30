import { RootStackParaamList } from 'navigation/navigation.types'
import AntDesignIcons from 'react-icons/ai'
import BootstrapIcons from 'react-icons/bs'

type Icons = keyof typeof AntDesignIcons & keyof typeof BootstrapIcons

export interface IMenuItem {
	path: keyof RootStackParaamList
	iconName: Icons
}
