# docsify-nomnoml

> :information_source: &nbsp; A docsify plugin to render nomnoml code fences.

[![nomnoml](https://img.shields.io/badge/www-nomnoml-%23fdf6e3)](https://nomnoml.com)
[![docsify](https://img.shields.io/badge/www-docsify-%2342b983)](https://docsify.js.org)
[![themeable](https://img.shields.io/badge/www-themeable-%230a87da)](https://jhildenbiddle.github.io/docsify-themeable/)

<!-- tabs:start -->

<!-- tab:SVG Diagram -->

```nomnoml renderSvg title="A nomnoml example modelling this docsify plugin"
# direction: right
[<reference> theme | stroke: <color>; fill: <color>]
[docsify |
  [config] <:- [nomnoml]
]
[<abstract> nomnoml | title; class; width; height | render() |
  [<actor> ☺] -- [<instance> render]
]
[docsify] -> [nomnoml]
```

<!-- tab:Markdown -->

````markdown » nomnoml
```nomnoml renderSvg
# direction: right
[<reference> theme | stroke: <color>; fill: <color>]
[docsify |
  [config] <:- [nomnoml]
]
[<abstract> nomnoml | title; class; width; height | render() |
  [<actor> ☺] -- [<instance> render]
]
[docsify] -> [nomnoml]
```
````

<!-- tabs:end -->
