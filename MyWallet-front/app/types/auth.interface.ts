import { IUser } from './user.interface'

export type IAuth = Pick<IUser, 'email' | 'password'>
