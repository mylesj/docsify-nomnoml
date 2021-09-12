import { stringifyAttributes } from '.'

describe('valid key-value pairs', () => {
	it('should handle single entries', () => {
		const input = {
			foo: 'value',
		}
		const expected = 'foo="value"'
		const actual = stringifyAttributes(input)
		expect(actual).toBe(expected)
	})

	it('should handle multiple entries', () => {
		const input = {
			foo: '1',
			bar: '2',
		}
		const expected = 'foo="1" bar="2"'
		const actual = stringifyAttributes(input)
		expect(actual).toBe(expected)
	})

	it('should handle complex entries', () => {
		const input = {
			a: '""',
			b: '><',
			c: '\\',
			d: '&&',
		}
		const expected = 'a="&quot;&quot;" b="&gt;&lt;" c="\\" d="&amp;&amp;"'
		const actual = stringifyAttributes(input)
		expect(actual).toBe(expected)
	})
})

describe('invalid key-value pairs', () => {
	it('should omit an entry with an invalid identifier', () => {
		const input = {
			'0invalid': 'value',
		}
		const expected = ''
		const actual = stringifyAttributes(input)
		expect(actual).toBe(expected)
	})

	it('should omit multiple entries with invalid identifiers', () => {
		const input = {
			'0invalid': '1',
			invalid$: '2',
			valid: 'valid',
			'inva!lid': '3',
		}
		const expected = 'valid="valid"'
		const actual = stringifyAttributes(input)
		expect(actual).toBe(expected)
	})
})
