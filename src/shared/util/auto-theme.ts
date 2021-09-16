import { AutoTheme, Directives } from '../types'

type Rgb = [number, number, number]

type Variant = 'light' | 'dark' | false

type ThemeVariant = {
	variant: Variant
	autotheme: AutoTheme
}

const lightness = (rgb: Rgb): number => {
	const [r, g, b] = rgb.map((n) => n / 255)
	return (Math.max(r, g, b) + Math.min(r, g, b)) / 2
}

const RE_COLOR =
	/^(?:(#?)([a-f\d]{6}))$|^(?:(rgba?)\(((?:\s*\d+\s*)(?:,?\s*\d+\s*){2}(?:,?\s*(?:0\.)?\d+\s*)?))\)$/i
const RE_MATCH_HEX = /[a-f\d]{2}/g
const RE_MATCH_NUM = /(?:\d+\.)?\d+/g

const parseColor = (color: string): Rgb | false => {
	const [, maybeHex, hex, maybeRgb, rgb] = RE_COLOR.exec(color) || []
	switch (maybeHex ?? maybeRgb) {
		case '':
		case '#': {
			return (hex.match(RE_MATCH_HEX) || []).map((n) =>
				Number.parseInt(n, 16)
			) as Rgb
		}
		case 'rgb': {
			return (rgb.match(RE_MATCH_NUM) || []).map(Number) as Rgb
		}
		case 'rgba': {
			const [r, g, b, a] = (rgb.match(RE_MATCH_NUM) || []).map(Number)
			if (a < 0.9) {
				// low confidence in predicting "light" vs. "dark" theme
				// note: Chrome getComputedStyle returns a defaults of
				//       rgba(0, 0, 0, 0) as the background "white" :/
				return false
			}
			return [r, g, b]
		}
		default:
			return false
	}
}

const cssStyleChain = (...styles: string[]): string =>
	styles
		.slice()
		.reverse()
		.reduce((acc, style) => (!acc ? style : `var(${style}, ${acc})`), '')

const resolveVariant = (autothemes: AutoTheme[]): ThemeVariant | false => {
	const fromBackground = autothemes
		.map((theme) => {
			const rgb = parseColor(theme.backgroundColor)
			if (!rgb) {
				return false
			}
			return {
				variant: <Variant>(lightness(rgb) >= 0.5 ? 'light' : 'dark'),
				autotheme: theme,
			}
		})
		.filter(Boolean)
		.pop()

	if (fromBackground) {
		return fromBackground
	}

	const fromForeground = autothemes
		.map((theme) => {
			const rgb = parseColor(theme.foregroundColor)
			if (!rgb) {
				return false
			}
			return {
				variant: <Variant>(lightness(rgb) <= 0.5 ? 'light' : 'dark'),
				autotheme: theme,
			}
		})
		.filter(Boolean)
		.pop()

	if (fromForeground) {
		return fromForeground
	}

	return false
}

export const getThemeStyles = (autotheme?: AutoTheme[]): Directives<string> => {
	if (!autotheme || !autotheme.length) {
		return {}
	}

	const themeVariant = resolveVariant(autotheme)

	if (!themeVariant) {
		return {}
	}

	const {
		variant,
		autotheme: { foregroundColor, backgroundColor },
	} = themeVariant

	return {
		stroke: cssStyleChain(
			'--nomnoml-svg-stroke',
			'--theme-color',
			foregroundColor
		),
		fill: [
			cssStyleChain(
				'--nomnoml-svg-fill-1',
				variant === 'light' ? '--mono-tint2' : '--mono-shade2',
				backgroundColor
			),
			cssStyleChain(
				'--nomnoml-svg-fill-2',
				variant === 'light' ? '--mono-tint3' : '--mono-shade3',
				backgroundColor
			),
		].join('; '),
	}
}
