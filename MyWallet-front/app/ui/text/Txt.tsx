import clsx from 'clsx'
import { FC, PropsWithChildren } from 'react'
import { Text } from 'react-native'
import { TextProps } from 'react-native/Libraries/Text/Text'

interface ITxt extends TextProps {
	className?: string
}

const Txt: FC<PropsWithChildren<ITxt>> = ({
	className,
	children,
	...attrs
}) => {
	return (
		<Text
			className={clsx(
				'font-comfortaa text-xl font-semibold text-white',
				className
			)}
			{...attrs}
		>
			{children}
		</Text>
	)
}

export default Txt
