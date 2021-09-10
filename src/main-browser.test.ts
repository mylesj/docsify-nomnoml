/**
 * @jest-environment jsdom
 */

interface Window {
	[key: string]: any
}

const PEER_DEPENDENCIES = Object.keys(
	require('../package.json').peerDependencies
)

describe('entry point - browser', () => {
	afterEach(() => {
		;['$docsify', ...PEER_DEPENDENCIES].forEach((global) => {
			delete window[global]
		})
		jest.resetModules()
	})

	describe('when missing peer dependencies', () => {
		let logFn: any
		beforeEach(() => {
			logFn = jest
				.spyOn(window.console, 'error')
				.mockImplementation(() => {
					/* silence is golden */
				})
		})

		describe('should log an error for each dependency', () => {
			PEER_DEPENDENCIES.forEach((dependency) =>
				it(dependency, () => {
					require('./main-browser')
					expect(logFn).toHaveBeenCalledWith(
						expect.stringContaining(dependency)
					)
				})
			)
		})

		it('should abort any attempt to register the plugin', () => {
			window.$docsify = { plugins: [] }
			require('./main-browser')
			expect(window.$docsify?.plugins?.length).toBe(0)
		})
	})

	describe('when peer dependencies are met', () => {
		const dependency = {}
		const setupDependencies = () =>
			PEER_DEPENDENCIES.reduce(
				(acc, peer) =>
					Object.assign(acc, {
						[peer]: dependency,
					}),
				window
			)

		const thisPlugin = () => {}
		const pluginCreator = jest.fn(() => thisPlugin)
		jest.mock('./shared/plugin', () => ({
			createPlugin: pluginCreator,
		}))
		beforeEach(() => {
			pluginCreator.mockClear()
		})

		it('should create a $docsify config if it does not already exist', () => {
			setupDependencies()
			require('./main-browser')
			expect(window.$docsify).toEqual({
				plugins: [thisPlugin],
			})
		})

		it('should create $docsify.plugins if it does not exist on an existing config', () => {
			setupDependencies()
			const existingConfig = {}
			window.$docsify = existingConfig
			require('./main-browser')
			expect(window.$docsify).toBe(existingConfig)
			expect(window.$docsify?.plugins).toEqual([thisPlugin])
		})

		it('should add to an existing $docsify.plugins configuration', () => {
			setupDependencies()
			const existingPlugin = () => {}
			window.$docsify = { plugins: [existingPlugin] }
			require('./main-browser')
			expect(window.$docsify?.plugins).toEqual([
				existingPlugin,
				thisPlugin,
			])
		})

		it('should injecting the correct dependencies', () => {
			setupDependencies()
			require('./main-browser')
			expect(pluginCreator).toHaveBeenCalledWith({
				nomnoml: dependency,
			})
		})
	})
})
