import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FC, useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'

import { RootStackParamList } from '@navigation/navigation.types'

import { COLORS } from '@constants/colors.constants'

import { useActions } from '@hooks/useActions'
import { useTypedSelector } from '@hooks/useTypedSelector'

import Layout from '@ui/layout/Layout'

import CarouselView from './components/CarouselView'
import LastTransactions from './components/LastTransactions'

type WalletType = NativeStackScreenProps<RootStackParamList, 'Wallets'>

const WalletsScreen: FC<WalletType> = ({ route }) => {
	const { getUserWallets } = useActions()
	const { wallets, isLoading } = useTypedSelector(({ wallets }) => wallets)

	const { selectedWallet } = useTypedSelector(({ wallets }) => wallets)

	useEffect(() => {
		getUserWallets()
	}, [])

	if (isLoading) {
		return (
			<Layout title={''} clNm='justify-center'>
				<ActivityIndicator
					animating={!wallets}
					size='large'
					color={COLORS.primaryLightGray}
				/>
			</Layout>
		)
	}

	return (
		<Layout title={route.name}>
			<View className='m-5 flex-1 items-center'>
				<CarouselView wallets={wallets || []} />
				{wallets && selectedWallet && (
					<LastTransactions wallet={selectedWallet} />
				)}
			</View>
		</Layout>
	)
}

export default WalletsScreen
