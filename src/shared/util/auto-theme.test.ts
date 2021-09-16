import { getThemeStyles } from '.'

describe('nulls', () => {
	it('should handle empty input', () => {
		expect(getThemeStyles()).toEqual({})
		expect(getThemeStyles([])).toEqual({})
	})
})

describe('color parsing', () => {
	it.each`
		input                       | expected
		${'fff'}                    | ${false}
		${'gggggg'}                 | ${false}
		${'ffffff'}                 | ${true}
		${'fffffff'}                | ${false}
		${'000'}                    | ${false}
		${'000000'}                 | ${true}
		${'0000000'}                | ${false}
		${'#fff'}                   | ${false}
		${'#ffffff'}                | ${true}
		${'#fffffff'}               | ${false}
		${'#000'}                   | ${false}
		${'#000000'}                | ${true}
		${'#0000000'}               | ${false}
		${'rgb(0, 0, 0)'}           | ${true}
		${'rgb(,0, 0, 0)'}          | ${false}
		${'rgba(0, 0, 0, 0)'}       | ${false}
		${'rgba(0, 0, 0, 0.9)'}     | ${true}
		${'rgb(255, 255, 255)'}     | ${true}
		${'rgb(  0  ,  0  ,  0  )'} | ${true}
	`('theme should resolve $expected for $input', ({ input, expected }) => {
		const actual = getThemeStyles([
			{
				foregroundColor: input,
				backgroundColor: input,
			},
		])
		const expectedTheme = expected
			? expect.objectContaining({
					stroke: expect.any(String),
					fill: expect.any(String),
			  })
			: {}
		expect(actual).toEqual(expectedTheme)
	})
})

describe('theme variants', () => {
	it('should resolve a light theme prioritising the current background color', () => {
		const actual = getThemeStyles([
			{
				foregroundColor: '#000000',
				backgroundColor: '#ffffff',
			},
		])
		const expected = expect.objectContaining({
			fill: expect.stringContaining('tint'),
			stroke: expect.any(String),
		})
	})

	it('should resolve a dark theme prioritising the current background color', () => {
		const actual = getThemeStyles([
			{
				foregroundColor: '#ffffff',
				backgroundColor: '#000000',
			},
		])
		const expected = expect.objectContaining({
			fill: expect.stringContaining('shade'),
			stroke: expect.any(String),
		})
	})

	it('should resolve a light theme falling back to the foreground color', () => {
		const actual = getThemeStyles([
			{
				foregroundColor: '#000000',
				backgroundColor: 'INVALID',
			},
		])
		const expected = expect.objectContaining({
			fill: expect.stringContaining('tint'),
			stroke: expect.any(String),
		})
	})

	it('should resolve a dark theme falling back to the foreground color', () => {
		const actual = getThemeStyles([
			{
				foregroundColor: '#ffffff',
				backgroundColor: 'INVALID',
			},
		])
		const expected = expect.objectContaining({
			fill: expect.stringContaining('shade'),
			stroke: expect.any(String),
		})
	})
})
