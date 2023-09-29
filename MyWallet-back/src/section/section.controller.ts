import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/decorators/auth.decorator'
import { SectionDto } from './section.dto'
import { SectionService } from './section.service'

@Controller('sections')
export class SectionController {
	constructor(private readonly sectionService: SectionService) {}

	@Auth()
	@Get(':walletId')
	async getAll(@Param('walletId') walletId: string) {
		return this.sectionService.getAll(+walletId)
	}

	@Auth()
	@Get('by-id/:sectionId')
	async byId(@Param('sectionId') sectionId: string) {
		return this.sectionService.byId(+sectionId)
	}

	@Auth()
	@Post(':walletId')
	@UsePipes(new ValidationPipe())
	async add(@Param('walletId') walletId: string, @Body() dto: SectionDto) {
		return this.sectionService.add(+walletId, dto)
	}

	@Auth()
	@Patch(':walletId')
	@UsePipes(new ValidationPipe())
	async update(@Param('walletId') walletId: string, @Body() dto: SectionDto) {
		return this.sectionService.update(+walletId, dto)
	}

	@Auth()
	@Delete(':walletId/:sectionName')
	async delete(
		@Param('walletId') walletId: string,
		@Param('sectionName') sectionName: string
	) {
		return this.sectionService.delete(+walletId, sectionName)
	}
}
