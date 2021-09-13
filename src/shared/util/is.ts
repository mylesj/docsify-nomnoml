export const isObject = (x: unknown): boolean =>
	Object.prototype.toString.call(x) === '[object Object]' && x !== null
