import { IUser } from '@AppTypes/user.interface'

export interface ITokens {
	accessToken: string
	refreshToken: string
}

export interface IUserError {
	error: string
	message: string
	statusCode: number
}

export interface IInitialState {
	user: IUser | null
	isLoading: boolean
	error: IUserError | null
}

export interface INamePassword extends IUser {
	password: string
}

export interface IAuthResponse extends ITokens {
	user: IUser
}
