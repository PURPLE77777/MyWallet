import cn from 'clsx'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
	Keyboard,
	Pressable,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'

import { COLORS } from '@constants/colors.constants'

import { INamePassword } from '@store/user/user.interface'

import { useActions } from '@hooks/useActions'
import { useAuth } from '@hooks/useAuth'

const AuthScreen = () => {
	const { user, error } = useAuth()

	const { login, register } = useActions()

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<INamePassword>({ mode: 'onChange' })

	const [isSignIn, setIsSignIn] = useState(true)

	const onSubmit = (data: INamePassword) => {
		isSignIn ? login(data) : register(data)
	}

	return (
		<Pressable
			android_disableSound
			onPress={Keyboard.dismiss}
			className='flex-1'
		>
			<View className='flex-1 items-center justify-center bg-primaryDarkGray'>
				<Text className='font-comfortaa text-3xl font-bold text-white'>
					{isSignIn ? 'Sign in' : 'Sign up'}
				</Text>
				<Controller
					control={control}
					name='name'
					rules={{
						required: 'Name is required',
						minLength: { message: 'Minimum of 2 symbols', value: 2 }
					}}
					render={({
						field: { value, onBlur, onChange },
						fieldState: { error }
					}) => (
						<>
							<TextInput
								className={cn(
									'mt-5 w-3/4 rounded-md border-[3px] border-solid border-primaryPurple px-5 py-2 text-lg text-white',
									error ? 'border-red-500' : ''
								)}
								placeholder='Enter name'
								placeholderTextColor={COLORS.gray75}
								onBlur={onBlur}
								onChangeText={onChange}
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
					name='password'
					rules={{
						required: 'Password is required',
						maxLength: { message: 'Maximum of 28 symbols', value: 28 },
						minLength: { message: 'Minimum of 8 symbols', value: 8 }
					}}
					render={({
						field: { value, onBlur, onChange },
						fieldState: { error }
					}) => (
						<>
							<TextInput
								className={cn(
									'mt-5 w-3/4 rounded-md border-[3px] border-solid border-primaryPurple px-5 py-2 text-lg text-white',
									error && 'border-red-500'
								)}
								placeholder='Enter password'
								placeholderTextColor={COLORS.gray75}
								onBlur={onBlur}
								onChangeText={onChange}
							/>
							{error && (
								<Text className='ml-[72px] mt-4 self-start text-[16px] text-red-500'>
									{error.message}
								</Text>
							)}
						</>
					)}
				/>
				{error && <Text className='mt-4 text-red-600'>{error.message}</Text>}
				<View className='mt-7 w-3/4 flex-row justify-center align-baseline'>
					<TouchableOpacity
						className='h-[40px] w-[120px] justify-center rounded-full bg-primaryPurple'
						onPress={handleSubmit(onSubmit)}
					>
						<Text className='t.fontComfortaa text-center font-bold text-white'>
							{isSignIn ? 'Sign in' : 'Sign up'}
						</Text>
					</TouchableOpacity>
					<Pressable
						onPress={() => setIsSignIn(!isSignIn)}
						className='absolute right-0 self-center '
					>
						<Text className='text-white underline'>
							{isSignIn ? 'Sign up' : 'Sign in'}
						</Text>
					</Pressable>
				</View>
			</View>
		</Pressable>
	)
}

export default AuthScreen
