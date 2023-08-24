import {
	AntDesign,
	Entypo,
	FontAwesome,
	FontAwesome5,
	Fontisto,
	Foundation,
	Ionicons,
	MaterialCommunityIcons
} from '@expo/vector-icons'

export type IIcons =
	| keyof typeof MaterialCommunityIcons.glyphMap
	| keyof typeof Ionicons.glyphMap
	| keyof typeof FontAwesome.glyphMap
	| keyof typeof AntDesign.glyphMap
	| keyof typeof Foundation.glyphMap
	| keyof typeof Entypo.glyphMap
	| keyof typeof FontAwesome5.glyphMap
	| keyof typeof Fontisto.glyphMap
