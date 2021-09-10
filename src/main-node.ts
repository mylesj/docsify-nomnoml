import nomnoml from 'nomnoml'

import { createPlugin } from './shared/plugin'

export const docsifyNomnoml = createPlugin({ nomnoml })

/*
 * This module was part of an inital experiment to register a plugin with docsify
 * locally via "npm install" but has been shelved for the moment - it is subject
 * to change and should not be relied on.
 */
