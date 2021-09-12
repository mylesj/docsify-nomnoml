const RE_VALID_HTML_ATTRIBUTE = /^[a-z][a-z0-9_.:-]*$/i

export const isValidHtmlAttribute = (input?: string): boolean =>
	typeof input === 'string' && RE_VALID_HTML_ATTRIBUTE.test(input)

const RE_VALID_CSS_CLASS = /^[a-z_-][a-z0-9_-]*$/i

export const isValidCssClass = (input?: string): boolean =>
	typeof input === 'string' && RE_VALID_CSS_CLASS.test(input)
