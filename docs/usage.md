# Usage

> :information_source: &nbsp; Instructing nomnoml to render a block as an SVG image.

## General

On their own a language type of `nomnoml` or `noml` will render as plain text inside code
fences. In order to render an SVG an explicit instruction can be specified, either
`renderSvg` or `render` for short.

### A basic example

<!-- tabs:start -->

<!-- tab:Long-form -->

````markdown » nomnoml
```nomnoml renderSvg
[Foo] -> [Bar]
```
````

<!-- tab:Short-form -->

````markdown » nomnoml
```noml render
[Foo] -> [Bar]
```
````

<!-- tab:Result -->

```noml render
[Foo] -> [Bar]
```

<!-- tabs:end -->

> _At the time of writing there is no [prismjs](https://prismjs.com/)
> integration available for nomnoml, however requiring a render instruction to be explicit
> was an inentional design decision - to leave the top-level namespace free for potential
> syntax highlighting support in the future._

## Attributes

A render instruction may additionally be followed by optional attributes.

| Attribute  | Description                                                                                                                                        |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **title**  | If a title is specified, a `<title/>` element will be embedded inside the SVG. It will also be set as the `aria-label` on the SVG element.         |
| **class**  | By default an SVG will have the CSS class name `nomnoml-svg` - a custom class may be specified that will be applied in addition to the default.    |
| **width**  | Any valid CSS width (relative or absolute) can be applied to the SVG element - if a width is set without height, the height will be set to "auto". |
| **height** | Any valid CSS height (relative or absolute) can be applied to the SVG element - if a height is set without width, the width will be set to "auto". |

### An example with attributes

````markdown » nomnoml
```nomnoml renderSvg width=100% class=my-class title="My Diagram"
[Foo] -> [Bar]
```
````

### Tips

In some applications it may be preferable to alter the width without an auto-adjustment of
the height (or vice-versa). This can be achieived via a custom class name and styling. For
example, the following combination would yield a centered diagram.

<!-- tabs:start -->

<!-- tab:Markdown -->

````markdown » nomnoml
```nomnoml renderSvg class=centered
[Foo] -> [Bar]
```
````

<!-- tab:CSS -->

```css
.nomnoml-svg.centered {
	width: 100%;
}
```

<!-- tab:Result -->

```nomnoml renderSvg class=centered
[Foo] -> [Bar]
```

<!-- tabs:end -->
