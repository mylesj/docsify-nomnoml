# Directives

> :information_source: &nbsp; Globally defining the native Nomnoml look and feel.

Nomnoml syntax allows for directives that tailor various aspects of the rendered SVG.

<!-- tabs:start -->

<!-- tab:Markdown -->

````
```noml render
#font: monospace
#fontSize: 16
#arrowSize: 1.8
[Foo] -> [Bar]
```
````

<!-- tab:Result -->

```noml render
#font: monospace
#fontSize: 16
#arrowSize: 1.8
[Foo] -> [Bar]
```

<!-- tabs: end -->

In the context of Docsify it may be preferable to define some of these globally to
ensure a consistent look and feel throughout a Docsify instance. The same configuration
can instead be specified on the `$docsify` configuration object.

```js
window.$docsify = {
	// ...
	nomnoml: {
		directives: {
			font: 'monospace',
			fontSize: 16,
			arrowSize: 1.8,
		},
	},
}
```
