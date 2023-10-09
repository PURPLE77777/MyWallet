import { useState } from 'react'
import { View } from 'react-native'

import Layout from '@ui/layout/Layout'

import SectionPreview from './components/SectionPreview'
import SwitchBtns from './components/SwitchBtns'
import { GainExpenseType, SelectedSectionType } from './type/section.interface'

const SectionsScreen = () => {
	const [typeTransactions, setTypeTransactions] =
		useState<GainExpenseType>('gains')

	const [selectedSection, setSelectedSection] =
		useState<SelectedSectionType>(null)

	// const {} = useActions()

	// const {
	// 	control,
	// 	handleSubmit,
	// 	formState: { errors }
	// } = useForm<ISection>({
	// 	mode: 'onChange'
	// })

	// const onSubmit = (data: ISectionForm) => {
	// 	console.log(data)
	// }

	return (
		<Layout title="Wallet's sections">
			<View className='flex-1'>
				<SwitchBtns
					typeTransactions={typeTransactions}
					setTypeTransactions={setTypeTransactions}
					setSelectedSection={setSelectedSection}
				/>

				{/* <View>
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
				</View> */}

				<SectionPreview
					typeTransactions={typeTransactions}
					selectedSection={selectedSection}
					setSelectedSection={setSelectedSection}
				/>
			</View>
		</Layout>
	)
}

export default SectionsScreen
