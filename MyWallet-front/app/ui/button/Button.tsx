import clsx from 'clsx'
import { FC } from 'react'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

import Txt from '@ui/text/Txt'

interface IButton extends TouchableOpacityProps {
	text: string
	cN?: string
	styleText?: string
}

const Button: FC<IButton> = ({ text, cN, styleText, ...attrs }) => {
	return (
		<TouchableOpacity
			activeOpacity={0.5}
			className={clsx(
				'h-[40px] items-center justify-center rounded-full bg-[#facc14] px-3',
				cN
			)}
			{...attrs}
		>
			<Txt
				className={clsx('font-comfortaaBold text-primaryDarkGray', styleText)}
			>
				{text}
			</Txt>
		</TouchableOpacity>
	)
}

export default Button
