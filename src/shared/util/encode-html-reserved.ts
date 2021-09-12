const RESERVED: Record<string, string> = {
	'&': 'amp',
	'<': 'lt',
	'>': 'gt',
	'"': 'quot',
}

const RE_RESERVED = RegExp(`[${Object.keys(RESERVED).join('')}]`, 'g')

export const encodeHtmlReserved = (input: string): string =>
	input.replace(RE_RESERVED, (match) => `&${RESERVED[match]};`)
