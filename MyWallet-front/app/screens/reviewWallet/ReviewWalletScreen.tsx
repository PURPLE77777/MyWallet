import clsx from 'clsx'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native'

import { COLORS } from '@constants/colors.constants'

import { IWalletName, ReviewWalletType } from '@AppTypes/waller.interface'

import { useActions } from '@hooks/useActions'

import Button from '@ui/button/Button'
import Layout from '@ui/layout/Layout'

const ReviewWalletScreen: FC<ReviewWalletType> = ({ route }) => {
	const wallet = route.params?.wallet

	const { createWallet, updateWallet, getUserWallets } = useActions()

	const { control, handleSubmit } = useForm<IWalletName>({
		mode: 'onChange',
		defaultValues: {
			name: wallet ? wallet.name : ''
		}
	})

	const onSubmit = (data: IWalletName) => {
		console.log(wallet, data)
		if (wallet) {
			updateWallet({ id: wallet.id, ...data })
		} else {
			createWallet(data)
		}
		getUserWallets()
	}

	return (
		<Layout title={route.name}>
			<View className='flex-1 items-center justify-center p-5'>
				<Controller
					control={control}
					name='name'
					rules={{
						minLength: {
							value: 3,
							message: 'Min length of the name is 3 symbols'
						},
						maxLength: {
							value: 32,
							message: 'Max length of the name is 32 symbols'
						}
					}}
					render={({
						field: { value, onBlur, onChange },
						fieldState: { error }
					}) => (
						<>
							<TextInput
								className={clsx(
									'mt-5 w-3/4 rounded-md border-[3px] border-solid border-primaryPurple px-5 py-2 text-lg text-white',
									error ? 'border-red-500' : ''
								)}
								value={value}
								onBlur={onBlur}
								onChangeText={onChange}
								placeholder='Enter name'
								placeholderTextColor={COLORS.gray75}
							/>
							{error && (
								<Text className='ml-[72px] mt-4 self-start text-[16px] text-red-500'>
									{error.message}
								</Text>
							)}
						</>
					)}
				/>
				<Button
					text={wallet ? 'Save' : 'Create wallet'}
					cN='mt-5'
					onPress={handleSubmit(onSubmit)}
				/>
			</View>
		</Layout>
	)
}

export default ReviewWalletScreen
