import { useState } from 'react'
import { View } from 'react-native'

import { EnumTypeTransaction } from '@AppTypes/section.interface'

import Layout from '@ui/layout/Layout'

import SectionPreview from './components/SectionPreview'
import SwitchBtns from './components/SwitchBtns'
import { SelectedSectionType } from './type/section.interface'

const SectionsScreen = () => {
	const [typeTransactions, setTypeTransactions] = useState<EnumTypeTransaction>(
		EnumTypeTransaction.GAIN
	)

	const [selectedSection, setSelectedSection] =
		useState<SelectedSectionType>(null)

	return (
		<Layout title="Wallet's sections">
			<View className='flex-1'>
				<SwitchBtns
					typeTransactions={typeTransactions}
					setTypeTransactions={setTypeTransactions}
					setSelectedSection={setSelectedSection}
				/>

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
