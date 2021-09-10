// Is overridden by docsify and not part of the marked spec.
// https://github.com/docsifyjs/docsify/blob/c9d4f7abc94a2cbc4bb558013775df380c1c8376/src/core/render/compiler.js#L198
declare namespace marked {
	interface RendererThis {
		origin: Renderer
	}
}
