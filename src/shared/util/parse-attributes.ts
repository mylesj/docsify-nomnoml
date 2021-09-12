const RE_MATCH_ATTRIBUTES = /(["'])(?:\\\1|.)*?\1|\S+=(["'])(?:\\\2|.)*?\2|\S+/g
const RE_MATCH_KEY_VALUE_PAIR = /([^=]+)(?:=(.+))?/
const RE_REPLACE_QUOTES_OUTER = [/^(["'])(.*)\1$/g, '$2'] as const
const RE_REPLACE_QUOTES_INNER = [/^([^"']*?)(["'])(.*)\2$/, '$1$3'] as const
const RE_REPLACE_QUOTES_BROKE = [/(?:(^|=)["'])/g, '$1'] as const
const RE_REPLACE_ESCAPE_CHARS = [/\\+/g, ''] as const

export const parseAttributes = <
	T extends string,
	R extends Record<T, string> = Record<T, string>
>(
	language: string,
	constrainBy?: T[]
): R => {
	const matches = language.match(RE_MATCH_ATTRIBUTES)
	return (matches || [])
		.map((match) =>
			match
				.replace(...RE_REPLACE_QUOTES_OUTER)
				.replace(...RE_REPLACE_QUOTES_INNER)
				.replace(...RE_REPLACE_QUOTES_BROKE)
				.replace(...RE_REPLACE_ESCAPE_CHARS)
		)
		.reduce((attributes, keyValue) => {
			const [, key, value] = keyValue.match(RE_MATCH_KEY_VALUE_PAIR) || []
			if (!constrainBy || (value && constrainBy.includes(<T>key))) {
				return Object.assign(attributes, {
					[key]: value,
				})
			}
			return attributes
		}, <R>{})
}
