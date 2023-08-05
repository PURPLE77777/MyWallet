import { RootStackParamList } from '@navigation/navigation.types'

import { IIcons } from 'ui/icons/icons.interface'

// export type IPath = Omit<keyof RootStackParamList, 'Auth'>

export interface IMenuItemData {
	path: keyof RootStackParamList
	iconName: IIcons
}
