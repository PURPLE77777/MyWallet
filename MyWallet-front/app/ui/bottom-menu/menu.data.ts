import { IMenuItemData } from './menu.interface'
import { HiOutlineWallet } from 'react-icons/hi2'
import { AiOutlineSetting } from 'react-icons/ai'

export const menuItemData: IMenuItemData[] = [
	{
		path: 'Wallets',
		iconName: HiOutlineWallet
	},
	{
		path: 'Settings',
		iconName: AiOutlineSetting
	}
]

// export const menuItemData: IMenuItem[] = [
//     {
//         path: 'Wallets',
//         iconName: <HiOutlineWallet/>
//     },
//     {
//         path: 'Settings',
//         iconName: 'AiOutlineSetting'
//     }
// ]
