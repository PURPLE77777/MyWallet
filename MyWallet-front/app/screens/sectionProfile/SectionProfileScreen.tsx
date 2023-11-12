import clsx from 'clsx'
import { FC, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Pressable, TextInput, View, useWindowDimensions } from 'react-native'

import { COLORS, SECTIONS_COLORS } from '@constants/colors.constants'
import { EXPENSES_ICONS, GAINS_ICONS } from '@constants/icons.constants'

import SectionService from '@services/section/section.service'

import { ISectionRequest } from '@screens/sectionProfile/types/section.types'
import SectionIcon from '@screens/sections/components/SectionIcon'

import {
	EnumTypeTransaction,
	SectionProfileType
} from '@AppTypes/section.interface'

import { useTypedSelector } from '@hooks/useTypedSelector'

import Button from '@ui/button/Button'
import Layout from '@ui/layout/Layout'
import Txt from '@ui/text/Txt'

const SectionProfileScreen: FC<SectionProfileType> = ({ route }) => {
	const { section, sectionType } = route.params
	const { width: screenWidth } = useWindowDimensions()

	const [sectionIcon, setSectionIcon] = useState(section ? section.icon : '')
	const [sectionColor, setSectionColor] = useState(section ? section.color : '')

	const { selectedWallet } = useTypedSelector(({ wallets }) => wallets)

	const { control, handleSubmit, reset } = useForm<ISectionRequest>({
		mode: 'onChange',
		defaultValues: {
			name: section ? section.name : '',
			color: section ? section.color : sectionColor,
			icon: section ? section.icon : sectionIcon
		}
	})

	const onSubmit = async (data: ISectionRequest) => {
		data.icon = sectionIcon
		data.color = sectionColor
		data.type = sectionType
		if (section) {
			const response = await SectionService.update(section.id, data)
			console.log('update', response)
		} else if (selectedWallet) {
			const response = await SectionService.create(selectedWallet.id, data)
			console.log('create', response)
		}
	}

	return (
		<Layout title='SectionProfile'>
			<View className='flex-1 justify-between p-5'>
				<View>
					<Txt className='text-center'>Wallet: {selectedWallet?.name}</Txt>
					<View>
						<View>
							<Controller
								control={control}
								name={'name'}
								render={({
									field: { onChange, onBlur, value },
									fieldState: { error }
								}) => (
									<>
										<TextInput
											className={clsx(
												'mt-5 w-full rounded-md border-[3px] border-solid border-primaryPurple px-5 py-2 text-lg text-white',
												error && 'border-red-500'
											)}
											keyboardType='numeric'
											placeholder='Section name'
											maxLength={28}
											value={value}
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
							{/* <Controller
								control={control}
								name={'amount'}
								render={({
									field: { onBlur, onChange, value },
									fieldState: { error }
								}) => (
									<>
										<TextInput
											className={clsx(
												'mt-5 w-full rounded-md border-[3px] border-solid border-primaryPurple px-5 py-2 text-lg text-white',
												error && 'border-red-500'
											)}
											placeholder='Section account'
											maxLength={28}
											value={value}
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
							/> */}
						</View>
						<Txt className='mb-2 mt-5'>Icon:</Txt>
						<View className='flex flex-row flex-wrap gap-3'>
							{sectionType === EnumTypeTransaction.GAIN
								? GAINS_ICONS.map(icon => (
										<SectionIcon
											icon={icon}
											sectionColor={sectionColor}
											sectionIcon={sectionIcon}
											setSectionIcon={setSectionIcon}
											key={`icon_gain-${icon}`}
										/>
								  ))
								: EXPENSES_ICONS.map(icon => (
										<SectionIcon
											icon={icon}
											sectionColor={sectionColor}
											sectionIcon={sectionIcon}
											setSectionIcon={setSectionIcon}
											key={`icon_gain-${icon}`}
										/>
								  ))}
						</View>
						<Txt className='mb-2 mt-5'>Color:</Txt>
						<View className='flex flex-row flex-wrap gap-3'>
							{SECTIONS_COLORS.map((color, ind) => (
								<Pressable
									onPress={() => setSectionColor(color)}
									className={clsx(color, {
										'border-[5px] border-solid border-[#e3e3e3]':
											sectionColor === color
									})}
									style={{
										width: screenWidth / 6.4,
										height: screenWidth / 6.4
									}}
									key={`section_color-${color}-${ind}`}
								></Pressable>
							))}
						</View>
					</View>
				</View>
				<Button
					text={section ? 'Save' : 'Add'}
					onPress={handleSubmit(onSubmit)}
				/>
			</View>
		</Layout>
	)
}

export default SectionProfileScreen
