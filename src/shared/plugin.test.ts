import { Renderer } from 'marked'
import { createPlugin } from './plugin'
import { Nomnoml, Plugin, DocsifyHook, DocsifyInstance } from './types'

describe('plugin', () => {
	interface GetMockVm {
		existingInterceptor?(...a: any[]): void
	}
	const getMockVm = ({ existingInterceptor }: GetMockVm = {}) => {
		const defaultInterceptor = jest.fn()
		const mockVm = (<unknown>{
			config: {
				markdown: {
					renderer: {
						...(existingInterceptor && {
							code: existingInterceptor,
						}),
						origin: {
							code: defaultInterceptor,
						},
					},
				},
			},
		}) as DocsifyInstance
		return { mockVm, defaultInterceptor }
	}

	const callInterceptor = (vm: DocsifyInstance, ...a: any[]): any =>
		((<unknown>vm.config.markdown?.renderer?.code) as Function)(...a)

	let nomnoml: Nomnoml
	let plugin: Plugin
	let mockHook: DocsifyHook
	beforeEach(() => {
		nomnoml = (<unknown>{
			renderSvg: jest.fn((x) => `rendered:${x}`),
		}) as Nomnoml
		plugin = createPlugin({ nomnoml })
		mockHook = {
			init: function (fn: () => void) {
				fn()
			},
		}
	})

	describe('when no existing renderer config exists', () => {
		it('should create a markdown config if it does not exist', () => {
			const vm = { config: {} }
			plugin(mockHook, vm)
			expect(vm.config).toEqual({
				markdown: {
					renderer: {
						code: expect.any(Function),
					},
				},
			})
		})

		it('should create a renderer if it does not exist on a markdown config', () => {
			const markdown: any = {}
			const vm = { config: { markdown } }
			plugin(mockHook, vm)
			expect(vm.config.markdown).toBe(markdown)
			expect(vm.config.markdown.renderer).toEqual({
				code: expect.any(Function),
			})
		})
	})

	describe('when an existing renderer config exists', () => {
		it('should not override a third-party render interceptor', () => {
			const existingInterceptor = jest.fn()
			const { mockVm } = getMockVm({ existingInterceptor })
			plugin(mockHook, mockVm)
			callInterceptor(mockVm, 'string', 'none', false)
			expect(existingInterceptor).toHaveBeenCalledTimes(1)
			expect(existingInterceptor).toHaveBeenCalledWith(
				'string',
				'none',
				false
			)
		})
	})

	describe('when invalid input is passed to the render interceptor', () => {
		let logFn: any
		beforeEach(() => {
			;(nomnoml as Nomnoml).renderSvg = () => {
				throw new Error('error')
			}
			logFn = jest
				.spyOn(global.console, 'error')
				.mockImplementation(() => {
					/* silence is golden */
				})
		})

		it.each`
			language
			${'noml'}
			${'nomnoml'}
		`(
			'should leave the top-level $language namespace free for prospective syntax highlighting',
			({ language }) => {
				const { mockVm, defaultInterceptor } = getMockVm()
				plugin(mockHook, mockVm)
				callInterceptor(mockVm, 'string', language, false)
				expect(defaultInterceptor).toBeCalledTimes(1)
				expect(defaultInterceptor).toBeCalledWith(
					'string',
					language,
					false
				)
			}
		)

		it('should fallback to the default behaviour for unknown language types', () => {
			const { mockVm, defaultInterceptor } = getMockVm()
			plugin(mockHook, mockVm)
			callInterceptor(mockVm, 'string', 'none', false)
			expect(defaultInterceptor).toBeCalledTimes(1)
			expect(defaultInterceptor).toBeCalledWith('string', 'none', false)
		})

		it('should fallback to the default behaviour for exceptions caused by invalid content', () => {
			const { mockVm, defaultInterceptor } = getMockVm()
			plugin(mockHook, mockVm)
			callInterceptor(mockVm, 'invalid', 'noml render', false)
			expect(defaultInterceptor).toBeCalledTimes(1)
			expect(defaultInterceptor).toBeCalledWith(
				'invalid',
				'noml render',
				false
			)
		})

		it('should log an error message for exceptions caused by invalid content', () => {
			const { mockVm } = getMockVm()
			plugin(mockHook, mockVm)
			callInterceptor(mockVm, 'invalid', 'noml render', false)
			expect(logFn).toHaveBeenCalledWith(
				'[nomnoml]',
				expect.objectContaining({
					message: 'error',
				})
			)
		})
	})

	describe('when valid input is passed to the render interceptor', () => {
		it.each`
			language
			${'nomnoml renderSvg'}
			${'nomnoml render'}
			${'noml renderSvg'}
			${'noml render'}
		`(
			'should handle the rendering for the "$language" language variant',
			({ language }) => {
				const { mockVm } = getMockVm()
				plugin(mockHook, mockVm)
				callInterceptor(mockVm, '[A] -> [B]', language, false)
				expect(nomnoml.renderSvg).toBeCalledTimes(1)
			}
		)

		it('should return a rendered string', () => {
			const { mockVm } = getMockVm()
			plugin(mockHook, mockVm)
			const input = '[A] -> [B]'
			const result = callInterceptor(mockVm, input, 'noml render', false)
			expect(result).toBe(`rendered:${input}`)
		})

		it('should not call the default renderer', () => {
			const { mockVm, defaultInterceptor } = getMockVm()
			plugin(mockHook, mockVm)
			callInterceptor(mockVm, '[A] -> [B]', 'noml render', false)
			expect(defaultInterceptor).not.toHaveBeenCalled()
		})

		it('should not call a third-party render interceptor', () => {
			const existingInterceptor = jest.fn()
			const { mockVm } = getMockVm({ existingInterceptor })
			plugin(mockHook, mockVm)
			callInterceptor(mockVm, '[A] -> [B]', 'noml render', false)
			expect(existingInterceptor).not.toHaveBeenCalled()
		})
	})
})
