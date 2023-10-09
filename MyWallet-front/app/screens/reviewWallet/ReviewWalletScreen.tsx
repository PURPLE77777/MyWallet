import clsx from 'clsx'
import { FC } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Text, TextInput, View } from 'react-native'

import { COLORS } from '@constants/colors.constants'

import {
	IWalletNameAccount,
	ReviewWalletType
} from '@AppTypes/waller.interface'

import { useActions } from '@hooks/useActions'

import Button from '@ui/button/Button'
import Layout from '@ui/layout/Layout'

const ReviewWalletScreen: FC<ReviewWalletType> = ({ route }) => {
	const wallet = route.params ? route.params.wallet : null

	const { createWallet, updateWallet } = useActions()

	const { control, handleSubmit } = useForm<IWalletNameAccount>({
		mode: 'onChange',
		defaultValues: {
			name: wallet ? wallet.name : '',
			account: wallet ? `${wallet.account}` : ''
		}
	})

	const onSubmit = (data: IWalletNameAccount) => {
		if (wallet) {
			updateWallet({ id: wallet.id, ...data })
		} else {
			createWallet(data)
		}
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
				<Controller
					control={control}
					name='account'
					rules={{
						minLength: 1,
						maxLength: 32,
						validate: value => !isNaN(Number(value)) || 'Please enter a cnumber'
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
								placeholder='Enter account'
								keyboardType='numeric'
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
					className='mt-5'
					onPress={handleSubmit(onSubmit)}
				/>
			</View>
		</Layout>
	)
}

export default ReviewWalletScreen
