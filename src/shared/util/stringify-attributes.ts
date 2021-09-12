import { isValidHtmlAttribute } from './is-valid-identifier'
import { encodeHtmlReserved } from './encode-html-reserved'

export const stringifyAttributes = (
	attributes: Record<string, string>
): string =>
	Object.entries(attributes).reduce(
		(acc, [key, value]) =>
			isValidHtmlAttribute(key)
				? `${acc}${acc ? ' ' : ''}${key}="${encodeHtmlReserved(value)}"`
				: acc,
		''
	)
