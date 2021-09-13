import { isObject } from '.'

describe('is object', () => {
	it.each`
		input    | expected
		${{}}    | ${true}
		${[]}    | ${false}
		${''}    | ${false}
		${0}     | ${false}
		${null}  | ${false}
		${false} | ${false}
	`('expect $input to be $expected', ({ input, expected }) => {
		expect(isObject(input)).toBe(expected)
	})
})
