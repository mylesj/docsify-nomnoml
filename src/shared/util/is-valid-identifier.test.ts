import { isValidHtmlAttribute, isValidCssClass } from '.'

describe('valid html attribute', () => {
	it.each`
		input        | expected
		${''}        | ${false}
		${undefined} | ${false}
		${'a'}       | ${true}
		${'A'}       | ${true}
		${'0'}       | ${false}
		${'-'}       | ${false}
		${'_'}       | ${false}
		${'.'}       | ${false}
		${':'}       | ${false}
		${'a1'}      | ${true}
		${'1a'}      | ${false}
		${'aaa'}     | ${true}
		${'a-b'}     | ${true}
		${'a_b'}     | ${true}
		${'a.b'}     | ${true}
		${'a:b'}     | ${true}
		${'a--b'}    | ${true}
		${'a__b'}    | ${true}
		${'a..b'}    | ${true}
		${'a::b'}    | ${true}
		${'a;'}      | ${false}
		${'a&'}      | ${false}
		${'a<'}      | ${false}
		${'a>'}      | ${false}
		${'a!'}      | ${false}
		${'a@'}      | ${false}
		${'a$'}      | ${false}
		${'a%'}      | ${false}
	`('expect `$input` to be $expected', ({ input, expected }) => {
		const actual = isValidHtmlAttribute(input)
		expect(actual).toBe(expected)
	})
})

describe('valid css class', () => {
	it.each`
		input        | expected
		${''}        | ${false}
		${undefined} | ${false}
		${'a'}       | ${true}
		${'A'}       | ${true}
		${'0'}       | ${false}
		${'-'}       | ${true}
		${'_'}       | ${true}
		${'a1'}      | ${true}
		${'1a'}      | ${false}
		${'aaa'}     | ${true}
		${'-a-b'}    | ${true}
		${'_a_b'}    | ${true}
		${'--a--b'}  | ${true}
		${'--a__b'}  | ${true}
		${'a.'}      | ${false}
		${'a:'}      | ${false}
		${'a;'}      | ${false}
		${'a&'}      | ${false}
		${'a<'}      | ${false}
		${'a>'}      | ${false}
		${'a!'}      | ${false}
		${'a@'}      | ${false}
		${'a$'}      | ${false}
		${'a%'}      | ${false}
	`('expect `$input` to be $expected', ({ input, expected }) => {
		const actual = isValidCssClass(input)
		expect(actual).toBe(expected)
	})
})
