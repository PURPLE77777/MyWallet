export const dateToFormat = (date: Date) => {
	const year = date.getFullYear(),
		month = date.getMonth() + 1,
		day = date.getDate()

	return `${day > 9 ? day : `0${day}`}:${
		month > 9 ? month : `0${month}`
	}:${year}`
}

export const dateFrFormat = (date: string) => {
	const numbers = date.split(':').map(num => +num)
	return new Date(numbers[2], numbers[1] - 1, numbers[0])
}
