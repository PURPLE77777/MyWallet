import clsx from 'clsx'
import { FC, PropsWithChildren } from 'react'
import { Platform, SafeAreaView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ILayout {
	title?: string
	clNm?: string
}

const Layout: FC<PropsWithChildren<ILayout>> = ({ title, children, clNm }) => {
	const { top } = useSafeAreaInsets()

	return (
		<SafeAreaView className='flex-1'>
			<View
				className={clsx('flex-1 bg-primaryDarkGray', clNm)}
				style={{ paddingTop: Platform.OS === 'ios' ? top / 5 : top * 1.5 }}
			>
				{title && (
					<Text className='text-center font-comfortaaBold text-xl text-white'>
						{title}
					</Text>
				)}
				{children}
			</View>
		</SafeAreaView>
	)
}

export default Layout
