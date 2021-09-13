import { Directives } from '../types'
import { isValidNomnomlDirective } from './is-valid-identifier'

export const stringifyDirectives = (directives: Directives): string =>
	Object.entries(directives).reduce(
		(acc, [key, value]) =>
			isValidNomnomlDirective(key)
				? `${acc}${acc ? '\n' : ''}#${key}: ${value}`
				: acc,
		''
	)
