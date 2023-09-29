import { useRoute } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { View } from 'react-native'

import { IWallet } from '@AppTypes/waller.interface'

import { useActions } from '@hooks/useActions'
import { useTypedSelector } from '@hooks/useTypedSelector'

import Layout from '@ui/layout/Layout'

import CarouselView from './components/CarouselView'
import LastTransactions from './components/LastTransactions'

const WalletsScreen = () => {
	const [wallet, setWallet] = useState<IWallet | null>(null)

	const route = useRoute()
	const { wallets } = useTypedSelector(({ wallets }) => wallets)

	const { getUserWallets } = useActions()

	useEffect(() => {
		getUserWallets()
	}, [])

	return (
		<Layout title={route.name}>
			<View>
				{wallets && <CarouselView wallets={wallets} setWallet={setWallet} />}
				{wallet && <LastTransactions wallet={wallet} />}
			</View>
		</Layout>
	)
}

export default WalletsScreen
