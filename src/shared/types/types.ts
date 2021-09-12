import { MarkedExtension } from 'marked'
export type Nomnoml = typeof import('nomnoml')

export interface Dependencies {
	nomnoml: Nomnoml
}

export type Attribute = 'title' | 'class' | 'width' | 'height'

export type Attributes = Record<Attribute, string>

export interface DocsifyInstance {
	config: {
		markdown?: MarkedExtension
	}
}

export interface DocsifyHook {
	init(callback: () => void): void
}

export type DocsifyPlugin = (hook: DocsifyHook, vm: DocsifyInstance) => void
