import { encodeHtmlReserved } from '.'

describe('should encode reserved entities', () => {
	it.each`
		input                | expected
		${''}                | ${''}
		${'&'}               | ${'&amp;'}
		${'<'}               | ${'&lt;'}
		${'>'}               | ${'&gt;'}
		${'"'}               | ${'&quot;'}
		${'1 < 2 == "true"'} | ${'1 &lt; 2 == &quot;true&quot;'}
		${'&&\\&\\\\&'}      | ${'&amp;&amp;\\&amp;\\\\&amp;'}
	`("expect '$input' to be '$expected'", ({ input, expected }) => {
		const actual = encodeHtmlReserved(input)
		expect(actual).toBe(expected)
	})
})
