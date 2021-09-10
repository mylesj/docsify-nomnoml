# docsify-nomnoml

A Docsify plugin to render nomnoml code fences.

## Install

Add the following scripts to the docsify `index.html` file - note that the
peer-dependencies, `nomnoml` and `graphre` should be loaded before the plugin.

```html
<script src="//cdn.jsdelivr.net/npm/graphre/dist/graphre.js"></script>
<script src="//cdn.jsdelivr.net/npm/nomnoml/dist/nomnoml.js"></script>
<script src="//cdn.jsdelivr.net/npm/docsify-nomnoml/dist/plugin.min.js"></script>
```

## Usage

To render a block, specify the code fence language as `nomnoml` or `noml` for short
followed by a `renderSvg` directive or `render` for short. _e.g._

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
