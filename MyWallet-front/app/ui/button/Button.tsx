import clsx from 'clsx'
import { FC } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

import Txt from '@ui/text/Txt'

interface IButton extends TouchableOpacityProps {
	text: string
	className?: string
}

const Button: FC<IButton> = ({ text, className, ...attrs }) => {
	return (
		<TouchableOpacity
			activeOpacity={0.5}
			className={clsx(
				'h-[40px] items-center justify-center rounded-full bg-[#facc14] px-3',
				className
			)}
			{...attrs}
		>
			<Txt className='font-comfortaaBold text-primaryDarkGray'>{text}</Txt>
		</TouchableOpacity>
	)
}

export default Button
