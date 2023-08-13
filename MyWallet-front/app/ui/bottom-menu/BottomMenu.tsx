import { FC } from 'react'
import { View } from 'react-native'

import { TypeNavigate } from '@navigation/navigation.types'

import MenuItem from './MenuItem'
import { menuItemData } from './menu.data'

interface IBottonMenu {
	navigate: TypeNavigate
	currentRoute?: string
}

const BottomMenu: FC<IBottonMenu> = ({ navigate, currentRoute }) => {
	return (
		<View className='flex-row'>
			{currentRoute &&
				menuItemData.map((item, i) => (
					<MenuItem
						item={item}
						key={`${item.path}-${i}}`}
						num={i}
						navigate={navigate}
						currentRoute={currentRoute}
					/>
				))}
		</View>
	)
}

export default BottomMenu
