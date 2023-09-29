export interface ISection {
	wallet: string
	amount: number
	section: string
	type: 'expenses' | 'gains'
	comment?: string
	date: Date
	icon: string
	color: string
}

export interface ISectionIcons {
	sectionName: string
	iconName: string
	color: string
}
