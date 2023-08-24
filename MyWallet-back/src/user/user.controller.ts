import {
	Body,
	Controller,
	Get,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { LogUserDto, RegUserDto } from './user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	async getAllUsers() {
		return this.userService.getAllUsers()
	}

	@Post('register')
	@UsePipes(new ValidationPipe())
	async register(@Body() dto: RegUserDto) {
		return this.userService.register(dto)
	}

	@Post('login')
	@UsePipes(new ValidationPipe())
	async login(@Body() dto: LogUserDto) {
		return this.userService.login(dto)
	}
}
