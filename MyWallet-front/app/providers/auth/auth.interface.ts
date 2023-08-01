import { Dispatch, SetStateAction } from 'react'
import { IUser } from 'types/user.interface'

export type UserType = IUser | null

export interface IAuthContext {
	user: UserType
	setUser: Dispatch<SetStateAction<UserType>>
}
