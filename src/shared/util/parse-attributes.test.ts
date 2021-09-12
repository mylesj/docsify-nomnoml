import { parseAttributes } from '.'

describe('should not return attributes with empty values', () => {
	const tests: [string, any][] = [
		['', {}],
		[' ', {}],
		['""', {}],
		['" "', {}],
		["''", {}],
		["' '", {}],
		['title class width height', {}],
		['title= class= width= height=', {}],
		[`"title=" 'class=' width="" height=''`, {}],
	]

	tests.forEach(([input, expected]) =>
		it(Boolean(input.trim()) ? input : `\`${input}\``, () => {
			const actual = parseAttributes(input)
			expect(actual).toEqual(expected)
		})
	)
})

describe('should correctly return known attributes from input', () => {
	const tests: [string, any][] = [
		['title=x class=y', { title: 'x', class: 'y' }],
		['width=3 height=4', { width: '3', height: '4' }],
		[`"width=0%" height='0%'`, { width: '0%', height: '0%' }],
		['"title=foo"', { title: 'foo' }],
		['"title=foo bar"', { title: 'foo bar' }],
		["'title=foo'", { title: 'foo' }],
		["'title=foo bar'", { title: 'foo bar' }],
		['title="foo"', { title: 'foo' }],
		['title="foo bar"', { title: 'foo bar' }],
		["title='foo'", { title: 'foo' }],
		["title='foo bar'", { title: 'foo bar' }],
		["title='foo \" bar'", { title: 'foo " bar' }],
		['title="foo \' bar"', { title: "foo ' bar" }],
		['"title=1\\" foo"', { title: '1" foo' }],
		["'title=1\\' foo'", { title: "1' foo" }],
		['title="1\\" foo"', { title: '1" foo' }],
		["title='1\\' foo'", { title: "1' foo" }],
	]

	tests.forEach(([input, expected]) =>
		it(`${input.padEnd(24, ' ')}  ->  ${JSON.stringify(expected)}`, () => {
			const actual = parseAttributes(input)
			expect(actual).toEqual(expected)
		})
	)
})

describe('should recover from unpaired quotes', () => {
	const tests: [string, any][] = [
		['"title=1 class=2', { title: '1', class: '2' }],
		["'title=1 class=2", { title: '1', class: '2' }],
		['title="1 class=2', { title: '1', class: '2' }],
		["title='1 class=2", { title: '1', class: '2' }],
		['\\"title=1 class=2', { '"title': '1', class: '2' }],
		["\\'title=1 class=2", { "'title": '1', class: '2' }],
		['title=\\"1 class=2', { title: '"1', class: '2' }],
		["title=\\'1 class=2", { title: "'1", class: '2' }],
	]

	tests.forEach(([input, expected]) =>
		it(`${input.padEnd(24, ' ')}  ->  ${JSON.stringify(expected)}`, () => {
			const actual = parseAttributes(input)
			expect(actual).toEqual(expected)
		})
	)
})

describe('should strip all backslashes', () => {
	const tests: [string, any][] = [
		['title="x\\"', { title: 'x' }],
		['title="x\\\\"', { title: 'x' }],
		['title="x\\\\\\"', { title: 'x' }],
		['title="x\\\\\\\\"', { title: 'x' }],
		['\\ti\\\\tle\\="x\\"', { title: 'x' }],
	]

	tests.forEach(([input, expected]) =>
		it(`${input.padEnd(24, ' ')}  ->  ${JSON.stringify(expected)}`, () => {
			const actual = parseAttributes(input)
			expect(actual).toEqual(expected)
		})
	)
})

describe('miscellaneous', () => {
	it('with constraints should not return unknown attributes', () => {
		const input = `noml render foo 'bar' "baz" a=b`
		const expected = {}
		const actual = parseAttributes(input, ['title'])
		expect(actual).toEqual(expected)
	})

	it('without constrains should return all attributes', () => {
		const input = `noml render foo 'bar' "baz" a=b`
		const expected = {
			noml: undefined,
			render: undefined,
			foo: undefined,
			bar: undefined,
			baz: undefined,
			a: 'b',
		}
		const actual = parseAttributes(input)
		expect(actual).toEqual(expected)
	})
})
