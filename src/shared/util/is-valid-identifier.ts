const createValidator =
	(regex: RegExp) =>
	(input?: string): boolean =>
		typeof input === 'string' && regex.test(input)

const RE_VALID_HTML_ATTRIBUTE = /^[a-z][a-z0-9_.:-]*$/i
export const isValidHtmlAttribute = createValidator(RE_VALID_HTML_ATTRIBUTE)

const RE_VALID_CSS_CLASS = /^[a-z_-][a-z0-9_-]*$/i
export const isValidCssClass = createValidator(RE_VALID_CSS_CLASS)

const RE_VALID_NOMNOML_DIRECTIVE = /^[a-z]+$/i
export const isValidNomnomlDirective = createValidator(
	RE_VALID_NOMNOML_DIRECTIVE
)
