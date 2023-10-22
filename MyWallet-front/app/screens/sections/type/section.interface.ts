import { Dispatch, SetStateAction } from 'react'

import { ISection } from '@AppTypes/section.interface'

export type GainExpenseType = 'gains' | 'expenses'

export type SelectedSectionType = ISection | null

export interface ISectionIcon {
	icon: string
	sectionColor: string
	sectionIcon: string
	setSectionIcon: Dispatch<SetStateAction<string>>
}
