import { FC, PropsWithChildren, ReactNode } from 'react'
import { IconContext } from 'react-icons'
import { View } from 'react-native'
import { IIconStyle } from './iconstyle.interface'

const IconProvider: FC<PropsWithChildren<IIconStyle>> = ({
	children,
	className,
	color,
	size,
	style
}) => {
	return (
		<IconContext.Provider value={{ className, color, size, style }}>
			{children}
		</IconContext.Provider>
	)
}

export default IconProvider
