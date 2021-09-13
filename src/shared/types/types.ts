import { MarkedExtension } from 'marked'
export type Nomnoml = typeof import('nomnoml')

export type Attribute = 'title' | 'class' | 'width' | 'height'

export type Attributes = Record<Attribute, string>

export type Directives = {
	[key in string]: unknown
}

export type NomnomlConfig = {
	directives?: Directives
}

export interface Dependencies {
	nomnoml: Nomnoml
	config: NomnomlConfig
}

export interface DocsifyInstance {
	config: {
		markdown?: MarkedExtension
	}
}

export interface DocsifyHook {
	init(callback: () => void): void
}

export type DocsifyPlugin = (hook: DocsifyHook, vm: DocsifyInstance) => void
