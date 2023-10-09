import { FC } from 'react'
import { View } from 'react-native'

import { SectionProfileType } from '@AppTypes/section.interface'

import Layout from '@ui/layout/Layout'
import Txt from '@ui/text/Txt'

const SectionProfileScreen: FC<SectionProfileType> = ({ route }) => {
	const section = route.params ? route.params.section : null

	return (
		<Layout title='SectionProfile'>
			<View>
				<Txt>{section?.name}</Txt>
			</View>
		</Layout>
	)
}

export default SectionProfileScreen
