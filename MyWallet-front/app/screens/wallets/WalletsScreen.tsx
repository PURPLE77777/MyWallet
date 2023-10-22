import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { FC, useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'

import { RootStackParamList } from '@navigation/navigation.types'

import { COLORS } from '@constants/colors.constants'

import { IWallet } from '@AppTypes/waller.interface'

import { useActions } from '@hooks/useActions'
import { useTypedSelector } from '@hooks/useTypedSelector'

import Button from '@ui/button/Button'
import Layout from '@ui/layout/Layout'

import CarouselView from './components/CarouselView'
import LastTransactions from './components/LastTransactions'

type WalletType = NativeStackScreenProps<RootStackParamList, 'Wallets'>

const WalletsScreen: FC<WalletType> = ({ route, navigation: { navigate } }) => {
	const [wallet, setWallet] = useState<IWallet | null>(null)
	const { getUserWallets, selectWallet, deselectWallet } = useActions()
	const { wallets, isLoading } = useTypedSelector(({ wallets }) => wallets)

	useEffect(() => {
		getUserWallets()
	}, [])

	useEffect(() => {
		wallet ? selectWallet(wallet) : deselectWallet()
	}, [wallet])

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
			<View className='mx-5 flex-1 justify-center'>
				{wallets && <CarouselView wallets={wallets} setWallet={setWallet} />}
				{wallets && wallet ? (
					<LastTransactions wallet={wallet} />
				) : (
					<Button
						text='Add wallet'
						onPress={() => {
							navigate('ReviewWallet', {
								wallet
							})
						}}
					/>
				)}
			</View>
		</Layout>
	)
}

export default WalletsScreen
