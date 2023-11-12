import { SECTION_BASE } from '@services/path.base'

import { ISectionRequest } from '@screens/sectionProfile/types/section.types'

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

	static async create(walletId: number, data: ISectionRequest) {
		const response = await instance<ISection>({
			url: `${SECTION_BASE}/${walletId}`,
			method: 'post',
			data
		})

		return response.data
	}

	static async update(section: number, data: ISectionRequest) {
		const response = await instance<ISection>({
			url: `${SECTION_BASE}/${section}`,
			method: 'patch',
			data
		})

		return response.data
	}
}

export default SectionService
