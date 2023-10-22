import { SECTION_BASE } from '@services/path.base'

import { ISection } from '@AppTypes/section.interface'

import { instance } from '@api/api.interceptor'

abstract class SectionService {
	static async getAll(walletId: number) {
		const response = await instance<ISection[]>({
			url: `${SECTION_BASE}/${walletId}`,
			method: 'get'
		})

		return response.data
	}
}

export default SectionService
