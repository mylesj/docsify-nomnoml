import { MarkedExtension } from 'marked'
export type Nomnoml = typeof import('nomnoml')

export type Attribute = 'title' | 'class' | 'width' | 'height'

export type Attributes = Record<Attribute, string>

export type Directives<T = unknown> = {
	[key in string]: T
}

export type AutoTheme = {
	foregroundColor: string
	backgroundColor: string
}

export type UserConfig = {
	directives?: Directives
	autotheme?: boolean
}

export interface Dependencies {
	nomnoml: Nomnoml
	config: UserConfig
	autotheme?: AutoTheme[]
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
