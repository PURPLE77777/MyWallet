import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class LogUserDto {
	@IsString()
	@IsEmail()
	email: string

	@IsString()
	@MinLength(4, {
		message: 'The password must consist of at least 4 symbols'
	})
	@MaxLength(32, {
		message: 'The password must consist of a maximum of 32 symbols'
	})
	password: string
}

export class RegUserDto extends LogUserDto {
	@IsString()
	@MinLength(2, {
		message: 'The name must at least consist of 2 symbols'
	})
	name: string
}
