import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { FC, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Pressable, TextInput, View } from 'react-native'

import { COLORS } from '@constants/colors.constants'

import SectionService from '@services/section/section.service'
import TransactionService from '@services/transaction/transaction.service'

import { EnumTypeTransaction, ISection } from '@AppTypes/section.interface'
import { TransactionProfileType } from '@AppTypes/transactions.interface'

import { useActions } from '@hooks/useActions'

import Button from '@ui/button/Button'
import Layout from '@ui/layout/Layout'
import Txt from '@ui/text/Txt'

import RadioBtns from './components/RadioBtns'
import SectionsDropMenu from './components/SectionsDropMenu'
import { ITransationRequest } from './types/transaction.types'

const TransactionProfileScreen: FC<TransactionProfileType> = ({
	route: {
		params: { wallet },
		name
	},
	navigation: { navigate }
}) => {
	const [selSection, setSelSection] = useState<ISection | null>(null)
	const [selSectionError, setSelSectionError] = useState<boolean>(false)
	const [typeTransaction, setTypeTransaaction] = useState<EnumTypeTransaction>(
		EnumTypeTransaction.GAIN
	)
	const [showMenu, setShowMenu] = useState<boolean>(false)
	const { getUserWallets } = useActions()

	const { data: sections, isFetching } = useQuery({
		queryKey: [`transactions`, wallet.id],
		queryFn: async () => {
			const response = await SectionService.getAll(wallet.id)
			return response
		}
	})

	const { control, handleSubmit, reset } = useForm<ITransationRequest>({
		mode: 'onChange',
		defaultValues: {
			amount: 0
		}
	})

	const onSubmit = async (data: ITransationRequest) => {
		if (selSection && wallet && data.amount) {
			data.amount = parseInt(data.amount as string)
			data.sectionId = selSection.id
			data.walletId = wallet.id
			const newTransaction = await TransactionService.addTransaction(data)
			console.log('newTransaction', newTransaction)
			getUserWallets()
		} else {
			setSelSectionError(true)
		}
	}
	return (
		<Layout title='Add transaction'>
			<Pressable
				className='flex-1 justify-between p-5'
				onPress={() => setShowMenu(false)}
				android_disableSound
			>
				<View>
					<Txt className='text-center'>{name}</Txt>
					<View>
						<RadioBtns
							typeTransaction={typeTransaction}
							setTypeTransaaction={setTypeTransaaction}
							setSelSection={setSelSection}
						/>

						<SectionsDropMenu
							selSectionError={selSectionError}
							setSelSectionError={setSelSectionError}
							showMenu={showMenu}
							setShowMenu={setShowMenu}
							selSection={selSection}
							sections={sections?.filter(
								section => section.type === typeTransaction
							)}
							setSelSection={setSelSection}
						/>

						<Txt className='ml-2'>Amount:</Txt>
						<Controller
							control={control}
							rules={{
								required: true,
								pattern: {
									value: /^["']?[\d]+['"]?$/,
									message: ''
								}
							}}
							name={'amount'}
							render={({
								field: { onChange, onBlur, value },
								fieldState: { error }
							}) => (
								<>
									<TextInput
										className={clsx(
											'mt-3 w-full rounded-md border-[3px] border-solid border-primaryPurple px-5 py-2 text-lg text-white',
											error && 'border-red-500'
										)}
										keyboardType='numeric'
										placeholder='Enter amount'
										maxLength={28}
										value={`${value}`}
										placeholderTextColor={COLORS.gray75}
										onBlur={onBlur}
										onChangeText={onChange}
									/>
									{error && (
										<Txt className='ml-[72px] mt-4 self-start text-[16px] text-red-500'>
											{error.message}
										</Txt>
									)}
								</>
							)}
						/>
					</View>
				</View>
				<Button text={'Add'} onPress={handleSubmit(onSubmit)} />
			</Pressable>
		</Layout>
	)
}

export default TransactionProfileScreen
