import { Nomnoml, UserConfig } from './types'
import { createSvgCreator } from './svg'

let nomnoml: Nomnoml
let config: UserConfig
beforeEach(() => {
	;(nomnoml = {} as Nomnoml), (config = {})
})

describe('when valid input is rendered by nomnoml', () => {
	it('should set default attributes if none are specified', () => {
		nomnoml.renderSvg = (x) => `<svg>${x}</svg>`
		const createSvg = createSvgCreator({ nomnoml, config })
		const expected =
			'<svg role="img" aria-label="An SVG render of a UML diagram." class="nomnoml-svg">[a]->[b]</svg>'
		const actual = createSvg('[a]->[b]', 'noml render')
		expect(actual).toBe(expected)
	})

	it('should correctly combine attributes if they are specified', () => {
		nomnoml.renderSvg = (x) => `<svg>${x}</svg>`
		const createSvg = createSvgCreator({ nomnoml, config })
		const expected =
			'<svg role="img" aria-label="hello world" class="nomnoml-svg foo" width="100%" height="200"><title>hello world</title>[a]->[b]</svg>'
		const actual = createSvg(
			'[a]->[b]',
			'noml render width=100% height=200 class=foo title="hello world"'
		)
		expect(actual).toBe(expected)
	})

	it('should correctly combine attributes preserving any generated by nomnoml', () => {
		nomnoml.renderSvg = (x) =>
			`<svg version="1.1" width="200" height="100" xmlns:xlink="https://" viewBox="0 0 200 100">${x}</svg>`
		const createSvg = createSvgCreator({ nomnoml, config })
		const expected =
			'<svg version="1.1" width="50" height="25" xmlns:xlink="https://" viewBox="0 0 200 100" role="img" aria-label="title" class="nomnoml-svg"><title>title</title>[a]->[b]</svg>'
		const actual = createSvg(
			'[a]->[b]',
			'noml render width=50 height=25 title="title"'
		)
		expect(actual).toBe(expected)
	})

	it('should set the height to auto if it is omitted when a width is specified', () => {
		nomnoml.renderSvg = (x) => `<svg width="200" height="100">${x}</svg>`
		const createSvg = createSvgCreator({ nomnoml, config })
		const expected =
			'<svg width="50" height="auto" role="img" aria-label="title" class="nomnoml-svg"><title>title</title>[a]->[b]</svg>'
		const actual = createSvg(
			'[a]->[b]',
			'noml render width=50 title="title"'
		)
		expect(actual).toBe(expected)
	})

	it('should set the width to auto if it is omitted when a height is specified', () => {
		nomnoml.renderSvg = (x) => `<svg width="200" height="100">${x}</svg>`
		const createSvg = createSvgCreator({ nomnoml, config })
		const expected =
			'<svg width="auto" height="50" role="img" aria-label="title" class="nomnoml-svg"><title>title</title>[a]->[b]</svg>'
		const actual = createSvg(
			'[a]->[b]',
			'noml render height=50 title="title"'
		)
		expect(actual).toBe(expected)
	})

	it('should omit the title element if for "reasons" nomnoml returns a self-closing svg tag', () => {
		nomnoml.renderSvg = () => `<svg/>`
		const createSvg = createSvgCreator({ nomnoml, config })
		const expected =
			'<svg role="img" aria-label="title" class="nomnoml-svg"/>'
		const actual = createSvg('[a]->[b]', 'noml render title=title')
		expect(actual).toBe(expected)
	})

	it('should omit the title element if for "reasons" nomnoml returns a self-closing svg tag', () => {
		nomnoml.renderSvg = () => `<svg/>`
		const createSvg = createSvgCreator({ nomnoml, config })
		const expected =
			'<svg role="img" aria-label="title" class="nomnoml-svg"/>'
		const actual = createSvg('[a]->[b]', 'noml render title=title')
		expect(actual).toBe(expected)
	})

	it('should compenstate for potential meta data in front of the svg tag', () => {
		nomnoml.renderSvg = (x) => `<!-- not svg tag --><svg>${x}</svg>`
		const createSvg = createSvgCreator({ nomnoml, config })
		const expected =
			'<!-- not svg tag --><svg role="img" aria-label="title" class="nomnoml-svg"><title>title</title>[a]->[b]</svg>'
		const actual = createSvg('[a]->[b]', 'noml render title=title')
		expect(actual).toBe(expected)
	})

	it('should consume a global directives config if it exists and prepend it to the nomnoml content', () => {
		nomnoml.renderSvg = (x) => `<svg>${x}</svg>`
		config.directives = {
			foo: 111,
			bar: '222',
		}
		const createSvg = createSvgCreator({ nomnoml, config })
		const expected =
			'<svg role="img" aria-label="title" class="nomnoml-svg"><title>title</title>#foo: 111\n#bar: 222\n#baz: 333\n[a]->[b]</svg>'
		const actual = createSvg(
			'#baz: 333\n[a]->[b]',
			'noml render title=title'
		)
		expect(actual).toBe(expected)
	})

	it('should concatenate theme directives if resolved successfully', () => {
		nomnoml.renderSvg = (x) => `<svg>${x}</svg>`
		config.directives = {
			foo: 111,
			bar: '222',
		}
		const autotheme = [
			{
				foregroundColor: '#ffffff',
				backgroundColor: '#000000',
			},
		]
		const createSvg = createSvgCreator({ nomnoml, config, autotheme })
		const expected = [
			'<svg role="img" aria-label="title" class="nomnoml-svg"><title>title</title>#stroke: var(--nomnoml-svg-stroke, var(--theme-color, #ffffff))',
			'#fill: var(--nomnoml-svg-fill-1, var(--mono-shade2, #000000)); var(--nomnoml-svg-fill-2, var(--mono-shade3, #000000))',
			'#foo: 111',
			'#bar: 222',
			'#baz: 333',
			'[a]->[b]</svg>',
		].join('\n')
		const actual = createSvg(
			'#baz: 333\n[a]->[b]',
			'noml render title=title'
		)
		expect(actual).toBe(expected)
	})
})
