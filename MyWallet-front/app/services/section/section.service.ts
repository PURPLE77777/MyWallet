import { SECTION_BASE } from '@services/path.base'

import { ISection } from '@AppTypes/section.interface'

import { instance } from '@api/api.interceptor'
import { sleep } from '@api/sleep'

abstract class SectionService {
	static async getAll(walletId: number) {
		await sleep()
		const response = await instance<ISection[]>({
			url: `${SECTION_BASE}/${walletId}`,
			method: 'get'
		})

		return response.data
	}
}

export default SectionService
