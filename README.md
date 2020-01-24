# d1-web

Lightweight responsive front-end framework
with interactive components and utilities.

Neutral default style can be customized with CSS variables.
Most components are usable without JavaScript.

## Get started

### Install with NPM

Install to your repository:
```
npm install d1-web
```
Then use in your CSS file:
```css
@import "../node_modules/d1-web/dist/d1.min.css";
```
And optionally bundle into your JavaScript file:
```javascript
let d1 = require("d1-web");
```

### Install manually

Add the [distributed](https://github.com/vvvkor/d1-web/archive/master.zip) CSS and JavaScript to the head of your document.

```
<!doctype html>
<html lang="en">
  <head>
    <title>Title</title>
    <meta charset="utf-8">
    <meta name="viewport" 
      content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="/css/d1.min.css">
    <script src="/js/d1.min.js"></script>
  </head>
  <body>
  </body>
</html>
```

### Use from CDN

### [jsDelivr](https://www.jsdelivr.com/package/npm/d1-web)

```html
<link href="https://cdn.jsdelivr.net/npm/d1-web/dist/d1.min.css" rel="stylesheet">
<script src="https://cdn.jsdelivr.net/npm/d1-web/dist/d1.min.js"></script>
```

#### [GitCDN](https://gitcdn.link/)

```html
<link href="https://gitcdn.link/repo/vvvkor/d1-web/master/dist/d1.min.css" rel="stylesheet">
<script src="https://gitcdn.link/repo/vvvkor/d1-web/master/dist/d1.min.js"></script>
```


## Docs

- [Documentation](https://vvvkor.github.io/d1-web/)
- [Overview](https://vvvkor.github.io/d1-web/overview.html)

## Browser Support

* IE 9 (limited)
* IE 10+, Edge
* Up-to-date versions of Chrome, Firefox, Opera, Safari
* iOS 6+
* Android 4+


## Todo

- Overview page for demo and testing
- Docs: describe options of modules, how to pass them
- Docs: unify style of components description
- Iconset as separate package
- Add components: scrollspy, notify, sortable/dragsort, slides, scroll-into-view, count


## License

[MIT](./LICENSE)