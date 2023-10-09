import {
	Body,
	Controller,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthDto } from './dto/auth.dto'
import { TokenDto } from './dto/token.dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('register')
	@UsePipes(new ValidationPipe())
	register(@Body() dto: AuthDto) {
		return this.authService.register(dto)
	}

	@Post('login')
	@UsePipes(new ValidationPipe())
	login(@Body() dto: AuthDto) {
		return this.authService.login(dto)
	}

	@Post('check-auth')
	@UsePipes(new ValidationPipe())
	checkAuth(@Body() dto: TokenDto) {
		return this.authService.checkAuth(dto)
	}
}
