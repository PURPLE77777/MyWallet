import { FC, PropsWithChildren } from 'react'
import { Platform, SafeAreaView, Text, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

interface ILayout {
	title: string
}

const Layout: FC<PropsWithChildren<ILayout>> = ({ title, children }) => {
	const { top } = useSafeAreaInsets()

	return (
		<SafeAreaView className='flex-1'>
			<View
				className='flex-1 bg-primaryDarkGray'
				style={{ paddingTop: Platform.OS == 'ios' ? top / 5 : top * 1.5 }}
			>
				<Text className='text-center font-comfortaaBold text-xl text-white'>
					{title}
				</Text>
				{children}
			</View>
		</SafeAreaView>
	)
}

export default Layout
