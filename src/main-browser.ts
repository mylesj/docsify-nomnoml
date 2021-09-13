import { isObject } from './shared/util'
import { createPlugin } from './shared/plugin'

const PEER_DEPENDENCIES = ['graphre', 'nomnoml']

const isMetDependencies = PEER_DEPENDENCIES.reduce((allMet, dependency) => {
	const isMet = dependency in window
	if (!isMet) {
		console.error(
			`[docsify-nomnoml] missing peer dependency, "${dependency}"`
		)
	}
	return allMet && isMet
}, true)

if (isMetDependencies) {
	if (!window.$docsify) {
		window.$docsify = {}
	}
	if (!window.$docsify.plugins) {
		window.$docsify.plugins = []
	}
	if (!isObject(window.$docsify.nomnoml)) {
		window.$docsify.nomnoml = {}
	}
	window.$docsify.plugins.push(
		createPlugin({
			nomnoml: window.nomnoml,
			config: window.$docsify.nomnoml,
		})
	)
}
