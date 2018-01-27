# butane-sidenav

[![butane-sidenav on NPM](https://img.shields.io/npm/v/butane-sidenav.svg?style=flat-square)](https://www.npmjs.com/package/butane-sidenav)

[Demo](https://codepen.io/alexcarpenter/pen/WMeQxm)

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
```

## Expected DOM structure

Below is the minimum required elements and attributes needed. An additional styling layer is also required to show/hide side-navs. There are some basic example styles within `docs/styles.css` for reference.

```html
<div id="main" data-butane-sidenav-container>
  <button data-butane-sidenav-show="side-nav-example">Show side-nav 1</button>
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
