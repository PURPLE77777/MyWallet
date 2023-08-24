import { useRoute } from '@react-navigation/native'
import cn from 'clsx'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
	Keyboard,
	Pressable,
	Text,
	TextInput,
	TouchableWithoutFeedback,
	View,
	useWindowDimensions
} from 'react-native'

import { EXPENSES_ICONS, GAINS_ICONS } from '@constants/icons.constants'

import Icon from '@ui/icons/Icon'
import Layout from '@ui/layout/Layout'

import { ISection, ISectionIcons } from './section.interface'

const SectionsScreen = () => {
	const route = useRoute()
	const [statView, setStatView] = useState<'gains' | 'expenses'>('expenses')
	const [gainsIcons, setGainsIcons] = useState<ISectionIcons[]>([])
	const [expensesIcons, setExpensesIcons] = useState<ISectionIcons[]>([])
	const [gainActive, setGainActive] = useState<number | null>(null)
	const [expenseActive, setExpenseActive] = useState<number | null>(null)

	const { width: screenWidth } = useWindowDimensions()

	const setGainSection = () => {
		setStatView('gains')
	}

	const setExpenseSection = () => {
		setStatView('expenses')
	}
	useEffect(() => {
		setGainsIcons(GAINS_ICONS)
		setExpensesIcons(EXPENSES_ICONS)
	}, [])

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<ISection>({
		mode: 'onChange'
	})

	const onSubmit = (data: ISection) => {
		console.log(data)
	}

	return (
		<Layout title={route.name}>
			<Pressable
				className='flex-1'
				android_disableSound
				onPress={Keyboard.dismiss}
			>
				<View className='flex-row items-center justify-center'>
					<TouchableWithoutFeedback onPress={setGainSection}>
						<Text
							className={cn(
								'bg-primaryPurple p-5 font-bold text-white',
								statView === 'gains' ? 'underline' : ''
							)}
						>
							Gains
						</Text>
					</TouchableWithoutFeedback>
					<TouchableWithoutFeedback onPress={setExpenseSection}>
						<Text
							className={cn(
								'bg-primaryPurple p-5 font-bold text-white',
								statView === 'expenses' ? 'underline' : ''
							)}
						>
							Expenses
						</Text>
					</TouchableWithoutFeedback>
				</View>
				<View>
					<Controller
						control={control}
						name='amount'
						rules={{
							required: true,
							pattern: {
								value: /^\d*?([?,.]?)[\d]{1,2}$/gm,
								message: 'Enter a correct value'
							}
						}}
						render={({
							field: { value, onBlur, onChange },
							fieldState: { error }
						}) => (
							<>
								<TextInput
									placeholder='Enter amount'
									onBlur={onBlur}
									keyboardType='numeric'
									onChangeText={onChange}
								/>
								{error && <Text>{error.message}</Text>}
							</>
						)}
					/>
					<Controller
						control={control}
						name='wallet'
						rules={{
							required: true
						}}
						render={({
							field: { value, onBlur, onChange },
							fieldState: { error }
						}) => (
							<>
								<TextInput
									placeholder='Enter amount'
									onBlur={onBlur}
									keyboardType='numeric'
									onChangeText={onChange}
								/>
								{error && <Text>{error.message}</Text>}
							</>
						)}
					/>
				</View>
				<View className='flex-row flex-wrap gap-y-5'>
					{statView === 'gains'
						? gainsIcons.map((gainIcon, ind) => (
								<Pressable
									className={cn(
										`h-[100px] w-1/4 items-center rounded-xl`,
										gainActive === ind && gainIcon.color
									)}
									key={`gainIcon-${gainIcon.sectionName}`}
									onPress={() => setGainActive(ind)}
								>
									<View className={cn('rounded-full p-4', gainIcon.color)}>
										<Icon name={gainIcon.iconName} color='#fff' size={40} />
									</View>
									<Text className='text-center text-white'>
										{gainIcon.sectionName}
									</Text>
								</Pressable>
						  ))
						: expensesIcons.map((expenseIcon, ind) => {
								return (
									<Pressable
										className={cn(
											`h-[100px] w-1/4 items-center rounded-xl`,
											expenseActive === ind && expenseIcon.color
										)}
										key={`expenseIcon-${expenseIcon.iconName}`}
										onPress={() => setExpenseActive(ind)}
									>
										<View className={cn('rounded-full p-4', expenseIcon.color)}>
											<Icon
												name={expenseIcon.iconName}
												color={'#ffffff'}
												size={40}
											/>
										</View>
										<Text className='text-center text-white'>
											{expenseIcon.sectionName}
										</Text>
									</Pressable>
								)
						  })}
					<Pressable
						className={cn('h-[100px] w-[100px] items-center rounded-xl')}
						onPress={() => {
							statView === 'gains'
								? setGainActive(null)
								: setExpenseActive(null)
						}}
					>
						<View className='rounded-full bg-gray-400 p-4'>
							<Icon name='pluscircle' color={'#ffffff'} size={40} />
						</View>
						<Text className='text-center text-white'>More</Text>
					</Pressable>
				</View>
			</Pressable>
		</Layout>
	)
}

export default SectionsScreen
