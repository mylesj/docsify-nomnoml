import { Renderer, RendererObject, RendererThis } from 'marked'
import { Dependencies, DocsifyPlugin } from './types'
import { createSvgCreator } from './svg'

const createRenderInterceptCreator =
	(renderer: RendererObject) =>
	<T extends keyof RendererObject>(
		type: T,
		interceptor: Renderer<false>[T]
	) => {
		const existingInterceptor = renderer[type]
		renderer[type] = function (this: RendererThis) {
			// self-acknowledging defeat: this typing is a bit janky :/
			const result = (interceptor as Function).apply(this, arguments)
			if (result !== false) {
				return result
			}
			return existingInterceptor
				? (existingInterceptor as Function).apply(this, arguments)
				: (this.origin[type] as Function).apply(this, arguments)
		}
	}

export const createPlugin = (dependencies: Dependencies): DocsifyPlugin => {
	const svgCreator = createSvgCreator(dependencies)
	return (hook, vm) => {
		hook.init(() => {
			if (!vm.config.markdown) {
				vm.config.markdown = {}
			}
			if (!vm.config.markdown.renderer) {
				vm.config.markdown.renderer = {}
			}

			const interceptCreator = createRenderInterceptCreator(
				vm.config.markdown.renderer
			)

			interceptCreator('code', function (content, type, isEscaped) {
				const isNomnoml =
					type && /^(?:nom){1,2}l\srender(?:svg)?/i.test(type)
				if (!content || !isNomnoml) {
					return false
				}
				try {
					const maybeRender = svgCreator(content, <string>type)
					if (maybeRender instanceof Error) {
						console.error(maybeRender.message, maybeRender)
						return false
					}
					return maybeRender
				} catch (e) {
					console.error('[nomnoml]', e)
					return false
				}
			})
		})
	}
}
