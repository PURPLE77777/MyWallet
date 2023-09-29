import { IsString, MaxLength, MinLength } from 'class-validator'

export class AuthDto {
	@IsString()
	@MinLength(2, {
		message: 'The name must consist of at least 2 symbols'
	})
	name: string

	@IsString()
	@MinLength(4, {
		message: 'The password must consist of at least 4 symbols'
	})
	@MaxLength(32, {
		message: 'The password must consist of a maximum of 32 symbols'
	})
	password: string
}
