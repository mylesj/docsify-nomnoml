# docsify-nomnoml

> _a docsify plugin to render nomnoml code fences_

[![github](https://img.shields.io/badge/-github-%235b5b5b?logo=github)](https://github.com/mylesj/docsify-nomnoml)
[![npm](https://img.shields.io/npm/v/docsify-nomnoml)](https://www.npmjs.com/package/docsify-nomnoml)
[![codecov](https://codecov.io/gh/mylesj/docsify-nomnoml/branch/main/graph/badge.svg?token=N2HV4ZPB4P)](https://codecov.io/gh/mylesj/docsify-nomnoml)
[![nomnoml](https://img.shields.io/badge/www-nomnoml-%23fdf6e3)](https://nomnoml.com)
[![docsify](https://img.shields.io/badge/www-docsify-%2342b983)](https://docsify.js.org)
[![themeable](https://img.shields.io/badge/www-themeable-%230a87da)](https://jhildenbiddle.github.io/docsify-themeable/)

## Install

Add the following scripts to the docsify `index.html` file - note that the
peer-dependencies, `nomnoml` and `graphre` must be loaded before the plugin.

```html
<script src="//cdn.jsdelivr.net/npm/graphre@0.1/dist/graphre.js"></script>
<script src="//cdn.jsdelivr.net/npm/nomnoml@1.4/dist/nomnoml.js"></script>
<script src="//cdn.jsdelivr.net/npm/docsify-nomnoml@1/dist/plugin.min.js"></script>
```

## Usage

To render a block, specify the code fence language as `nomnoml` or `noml` for short
followed by a `renderSvg` instruction or `render` for short.

````none
```nomnoml renderSvg
[Foo] -> [Bar]
```
````

_or_

````none
```noml render
[Foo] -> [Bar]
```
````

## Attributes

Some optional attributes may be specified after the render instruction:

-   **title** - text to be rendered in the SVG `<title/>` - additionally set as the `aria-label`
-   **class** - custom CSS class added to the SVG in addition to the default `nomnoml-svg`
-   **width** - a width can be added to the SVG
-   **height** - a height can be added to the SVG

````none
```nomnoml renderSvg width=100% class=my-class title="My Diagram"
[Foo] -> [Bar]
```
````

## Theming

By default the plugin will try to match the `stroke` and `fill` colors of the rendered SVG
to the current theme. This may be overridden by explicity declaring custom CSS rules.

```css
:root {
	--nomnoml-svg-stroke: <color>;
	--nomnoml-svg-fill-1: <color>;
	--nomnoml-svg-fill-2: <color>;
}
```

Alternatively, the theming can be completely disabled by setting:

```js
window.$docsify = {
	// ...
	nomnoml: {
		autotheme: false,
	},
}
```

## Directives

While directives may ordinarily be specified in nomnoml syntax, it may be preferable to define
some of them globally such that they are consistently applied throughout a docsify instance.
For example:

````
```noml render
#fontSize: 14
#arrowSize: 1.5
[Foo] -> [Bar]
```
````

Which can instead be specified on the `$docsify` configuration object.

```js
window.$docsify = {
	// ...
	nomnoml: {
		directives: {
			fontSize: 14,
			arrowSize: 1.5,
		},
	},
}
```
