import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { FontAwesome } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { Foundation } from '@expo/vector-icons'
import { Entypo } from '@expo/vector-icons'

export type IIcons =
	| keyof typeof MaterialCommunityIcons.glyphMap
	| keyof typeof Ionicons.glyphMap
	| keyof typeof FontAwesome.glyphMap
	| keyof typeof AntDesign.glyphMap
	| keyof typeof Foundation.glyphMap
	| keyof typeof Entypo.glyphMap
