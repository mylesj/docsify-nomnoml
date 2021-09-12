# docsify-nomnoml

> _a docsify plugin to render nomnoml code fences_

[![npm](https://img.shields.io/npm/v/docsify-nomnoml)](https://www.npmjs.com/package/docsify-nomnoml)
[![codecov](https://codecov.io/gh/mylesj/docsify-nomnoml/branch/main/graph/badge.svg?token=N2HV4ZPB4P)](https://codecov.io/gh/mylesj/docsify-nomnoml)
[![nomnoml](https://img.shields.io/badge/www-nomnoml-%23fdf6e3)](https://nomnoml.com)
[![docsify](https://img.shields.io/badge/www-docsify-%2342b983)](https://docsify.js.org)

## Install

Add the following scripts to the docsify `index.html` file - note that the
peer-dependencies, `nomnoml` and `graphre` should be loaded before the plugin.

```html
<script src="//cdn.jsdelivr.net/npm/graphre@0.1/dist/graphre.js"></script>
<script src="//cdn.jsdelivr.net/npm/nomnoml@1.4/dist/nomnoml.js"></script>
<script src="//cdn.jsdelivr.net/npm/docsify-nomnoml/dist/plugin.min.js"></script>
```

## Usage

To render a block, specify the code fence language as `nomnoml` or `noml` for short
followed by a `renderSvg` directive or `render` for short.

_e.g._

````none
```nomnoml renderSvg
[Foo] -> [Bar]
```
````

or

````none
```noml render
[Foo] -> [Bar]
```
````

## Attributes

Optional attributes may be specified after render directive - those supported are:

-   **title** - text to be rendered in the `<title/>` element inside of the SVG -
    it will additionally be set as the `aria-label` attribute on the SVG element
-   **class** - a custom CSS class can be added to the SVG element for specificity,
    in addition to the default `nomnoml-svg` class
-   **width** - a width can be added to the SVG element
-   **height** - a height can be added to the SVG element

_e.g._

````none
```nomnoml renderSvg width=100% class=my-class title="My Diagram"
[Foo] -> [Bar]
```
````
