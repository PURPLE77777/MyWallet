import { Injectable } from '@nestjs/common'
import { PaginationDto } from './pagination.dto'

@Injectable()
export class PaginationService {
	getPagination(dto: PaginationDto) {
		if (dto.perPage || dto.perPage) {
			const page = +dto.page ? +dto.page : 1,
				perPage = +dto.perPage ? +dto.perPage : 10,
				skip = (page - 1) * perPage

			return { perPage, skip }
		}

		return { perPage: undefined, skip: undefined }
	}
}
