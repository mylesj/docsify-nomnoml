import { MarkedExtension } from 'marked'
export type Nomnoml = typeof import('nomnoml')

export interface DocsifyInstance {
	config: {
		markdown?: MarkedExtension
	}
}

export interface DocsifyHook {
	init(callback: () => void): void
}

export type Plugin = (hook: DocsifyHook, vm: DocsifyInstance) => void
