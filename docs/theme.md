# Theme

> :information_source: &nbsp; Customising the look and feel of a Nomnoml SVG.

By default the plugin will try to match the `stroke` and `fill` colors of the rendered SVG
to the current theme - where styles aren't matched this will fallback to the foreground and
background colors of the current page. Styles may be customized by via themeable CSS rules.

```css
:root {
	--nomnoml-svg-stroke: <color>;
	--nomnoml-svg-fill-1: <color>;
	--nomnoml-svg-fill-2: <color>;
}
```

> _Note that under the hood, this plugin is applying themes as global directives to
> Nomnoml. Specifing `stroke` and `fill` as directives in the Docsify configuration
> will override any theme styling._

---

The default behavior is meant to work with extensions of the core theme systems in
Docsify and the `docsify-themeable` plugin but isn't expected suite everyones'
requirements or tastes. Should you wish to disable the theming entirely and revert
to the Nomnoml-default color scheme, the following configuration can be set.

```js
window.$docsify = {
	// ...
	nomnoml: {
		autotheme: false,
	},
}
```
