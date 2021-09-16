import { Dependencies, Directives, Attribute, Attributes } from './types'
import {
	parseAttributes,
	stringifyAttributes,
	stringifyDirectives,
	encodeHtmlReserved,
	isValidCssClass,
	getThemeStyles,
	isObject,
} from './util'

const USER_ATTRIBUTES: Attribute[] = ['title', 'class', 'width', 'height']

// yes, yes, using RegExp to parse HTML... but it's just one tag.
const RE_MATCH_SVG_TAG = /(.*?)(<svg)(.*?)(\/?>)/i

export const createSvgCreator =
	({ nomnoml, config, autotheme }: Dependencies) =>
	(nomlnomlStr: string, attributes: string): string | Error => {
		const userDirectives = isObject(config.directives)
			? `${stringifyDirectives(<Directives>config.directives)}\n`
			: ''

		let themeDirectives = ''
		if (autotheme && config.autotheme !== false) {
			themeDirectives = stringifyDirectives(getThemeStyles(autotheme))
		}

		const directives = [themeDirectives, userDirectives]
			.filter(Boolean)
			.join('\n')
		const svg = nomnoml.renderSvg(`${directives}${nomlnomlStr}`)
		const match = svg.match(RE_MATCH_SVG_TAG)

		if (!match) {
			return new Error(
				'[docsify-nomnoml] unable to wrap svg, unexpected input'
			)
		}

		const [
			{ length: tagLength },
			potentialCruft,
			tagOpen,
			tagAttributes,
			tagClose,
		] = match

		const svgAttributes = parseAttributes(tagAttributes)
		const userAttributes = parseAttributes(attributes, USER_ATTRIBUTES)
		const finalAttributes: Partial<Attributes> & Record<string, string> = {
			...svgAttributes,
			role: 'img',
			'aria-label':
				userAttributes.title || 'An SVG render of a UML diagram.',
			class: [svgAttributes.class, 'nomnoml-svg', userAttributes.class]
				.filter(isValidCssClass)
				.join(' '),
		}

		if (userAttributes.width) {
			finalAttributes.width = userAttributes.width
			if (!userAttributes.height) {
				finalAttributes.height = 'auto'
			}
		}

		if (userAttributes.height) {
			finalAttributes.height = userAttributes.height
			if (!userAttributes.width) {
				finalAttributes.width = 'auto'
			}
		}

		const titleElement = userAttributes.title
			? `<title>${encodeHtmlReserved(userAttributes.title)}</title>`
			: ''

		return [
			potentialCruft,
			`${tagOpen} `,
			stringifyAttributes(finalAttributes),
			tagClose,
			tagClose === '/>' ? '' : titleElement,
			svg.substring(tagLength + <number>match.index),
		].join('')
	}
