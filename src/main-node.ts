import nomnoml from 'nomnoml'

import { NomnomlConfig } from './shared/types'
import { createPlugin as createPluginInternal } from './shared/plugin'

export const createPlugin = (config: NomnomlConfig) =>
	createPluginInternal({ nomnoml, config })

/*
 * This module was part of an inital experiment to register a plugin with docsify
 * locally via "npm install" but has been shelved for the moment - it is subject
 * to change and should not be relied on.
 */
