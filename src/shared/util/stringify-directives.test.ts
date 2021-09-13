import { stringifyDirectives } from '.'

describe('valid key-value pairs', () => {
	it('should handle single entries', () => {
		const input = {
			foo: 'value',
		}
		const expected = '#foo: value'
		const actual = stringifyDirectives(input)
		expect(actual).toBe(expected)
	})

	it('should handle multiple entries', () => {
		const input = {
			foo: '1',
			bar: '2',
		}
		const expected = ['#foo: 1', '#bar: 2'].join('\n')
		const actual = stringifyDirectives(input)
		expect(actual).toBe(expected)
	})

	it('should handle complex entries', () => {
		const input = {
			edges: 'hard | rounded',
			fill: '#eee8d5; #fdf6e3',
		}
		const expected = [
			'#edges: hard | rounded',
			'#fill: #eee8d5; #fdf6e3',
		].join('\n')
		const actual = stringifyDirectives(input)
		expect(actual).toBe(expected)
	})
})

describe('invalid key-value pairs', () => {
	it('should omit an entry with an invalid identifier', () => {
		const input = {
			'0invalid': 'value',
		}
		const expected = ''
		const actual = stringifyDirectives(input)
		expect(actual).toBe(expected)
	})

	it('should omit multiple entries with invalid identifiers', () => {
		const input = {
			'0invalid': '1',
			invalid$: '2',
			valid: 'valid',
			'inva!lid': '3',
		}
		const expected = '#valid: valid'
		const actual = stringifyDirectives(input)
		expect(actual).toBe(expected)
	})
})
