import { FC, useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'

import { COLORS } from '@constants/colors.constants'

import { WalletsType } from '@AppTypes/waller.interface'

import { useActions } from '@hooks/useActions'
import { useTypedSelector } from '@hooks/useTypedSelector'

import Layout from '@ui/layout/Layout'

import CarouselView from './components/CarouselView'
import LastTransactions from './components/LastTransactions'

const WalletsScreen: FC<WalletsType> = ({ route }) => {
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
