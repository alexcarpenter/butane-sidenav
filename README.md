# butane-sidenav

[![butane-sidenav on NPM](https://img.shields.io/npm/v/butane-sidenav.svg?style=flat-square)](https://www.npmjs.com/package/butane-sidenav) [![Standard JavaScript Style](https://img.shields.io/badge/code_style-standard-brightgreen.svg?style=flat-square)](http://standardjs.com/)

> A lightweight accessible side-nav JS library.

## Install

Install butane-sidenav, and add it to your `package.json` dev dependencies.

```
$ npm install butane-sidenav --save-dev
```

Then `import` it into the file where you'll use it.

```es6
import ButaneSideNav from 'butane-sidenav'
```

## Instantiate

```es6
// using the default options
ButaneSideNav.init()

// using custom options, default options listed
ButaneSideNav.init({
  contentContainer: '#main'
})
```

## Expected DOM structure

Below is the minimum required elements and attributes needed. An additional styling layer is also required to show/hide side-navs. There are some basic example styles within `docs/styles.css` for reference.

```html
<div id="main">
  <button data-butane-sidenav-controls="side-nav-example">Show side-nav 1</button>
</div>

<div id="side-nav-example">
  <nav>
    <button data-butane-sidenav-hide>&times;</button>
  </nav>
  <!--
    An overlay is optional but recommended.
    See docs/styles.css for recommended usage.
    -->
  <div data-butane-sidenav-hide></div>
</div>
```

## License

[MIT](https://opensource.org/licenses/MIT). © 2017 Alex Carpenter
