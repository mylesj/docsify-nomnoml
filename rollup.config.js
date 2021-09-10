import typescript from '@rollup/plugin-typescript'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { uglify } from 'rollup-plugin-uglify'

export default [
	{
		input: './src/main-node.ts',
		output: {
			file: './dist/module.mjs',
			format: 'es',
		},
		plugins: [nodeResolve(), commonjs(), typescript()],
		external: ['nomnoml'],
	},
	{
		input: './src/main-node.ts',
		output: {
			file: './dist/module.cjs',
			format: 'cjs',
		},
		plugins: [nodeResolve(), commonjs(), typescript()],
		external: ['nomnoml'],
	},
	{
		input: './src/main-browser.ts',
		output: {
			file: './dist/plugin.min.js',
			format: 'iife',
		},
		plugins: [nodeResolve(), commonjs(), typescript(), uglify()],
		external: ['nomnoml'],
	},
]
