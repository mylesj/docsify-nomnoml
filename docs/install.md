# Install

> :information_source: &nbsp; Installing Nomnoml into a Docsify instance.

The following scripts can be added to the `index.html` file of a Docsify site. This
plugin has two peer-dependencies, `nomnoml` and `graphre` which must be loaded in order.

```html
<script src="//cdn.jsdelivr.net/npm/graphre@0.1/dist/graphre.js"></script>
<script src="//cdn.jsdelivr.net/npm/nomnoml@1.4/dist/nomnoml.js"></script>
<script src="//cdn.jsdelivr.net/npm/docsify-nomnoml@1/dist/plugin.min.js"></script>
```

> _The versions stated reflect a stable setup at the time of writing however newer
> versions should generally work as this plugin passes input straight through to
> dependencies with the aim of maintaining a minimal footprint._
