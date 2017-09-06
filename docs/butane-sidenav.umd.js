(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.ButaneSideNav = factory());
}(this, (function () { 'use strict';

window.addEventListener("load", function () {
  function e() {
    return null;
  }function n(a, b, c) {
    if (0 > b) {
      if (a.previousElementSibling) {
        for (a = a.previousElementSibling; a.lastElementChild;) {
          a = a.lastElementChild;
        }return a;
      }return a.parentElement;
    }if (a != c && a.firstElementChild) return a.firstElementChild;for (; a;) {
      if (a.nextElementSibling) return a.nextElementSibling;a = a.parentElement;
    }return null;
  }function k(a) {
    for (; a && a !== document.documentElement;) {
      if (a.hasAttribute("inert")) return a;a = a.parentElement;
    }return null;
  }function h(a) {
    var b = a.path;return b && b[0] || a.target;
  }function l(a) {
    a.path[a.path.length - 1] !== window && (m(h(a)), a.preventDefault(), a.stopPropagation());
  }function m(a) {
    var b = k(a);if (b) {
      if (document.hasFocus() && 0 !== g) {
        var e = (c || document).activeElement,
            d = 0 > g ? !0 : !1,
            f = null;try {
          f = new KeyboardEvent("keydown", { keyCode: 9, which: 9, key: "Tab", code: "Tab", keyIdentifier: "U+0009", shiftKey: !!d, bubbles: !0 });
        } catch (p) {
          try {
            f = document.createEvent("KeyboardEvent"), f.initKeyboardEvent("keydown", !0, !0, window, "Tab", 0, d ? "Shift" : "", !1, "en");
          } catch (q) {}
        }if (f) {
          try {
            Object.defineProperty(f, "keyCode", { value: 9 });
          } catch (p) {}document.dispatchEvent(f);
        }if (e != (c || document).activeElement) return;for (d = b;;) {
          d = n(d, g, b);if (!d) break;if (!(0 > d.tabIndex) && (d.focus(), (c || document).activeElement !== e)) return;
        }
      }a.blur();
    }
  }(function (a) {
    var b = document.createElement("style");b.type = "text/css";b.styleSheet ? b.styleSheet.cssText = a : b.appendChild(document.createTextNode(a));document.body.appendChild(b);
  })("/*[inert]*/*[inert]{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;pointer-events:none}");
  window.ShadowRoot && (e = function e(a) {
    for (; a && a !== document.documentElement;) {
      if (a instanceof window.ShadowRoot) return a;a = a.parentNode;
    }return null;
  });var g = 0;document.addEventListener("keydown", function (a) {
    g = 9 === a.keyCode ? a.shiftKey ? -1 : 1 : 0;
  });document.addEventListener("mousedown", function () {
    g = 0;
  });var c = null;document.body.addEventListener("focus", function (a) {
    var b = h(a);a = b == a.target ? null : e(b);if (a != c) {
      if (c) {
        if (!(c instanceof window.ShadowRoot)) throw Error("not shadow root: " + c);c.removeEventListener("focusin", l, !0);
      }a && a.addEventListener("focusin", l, !0);c = a;
    }m(b);
  }, !0);document.addEventListener("click", function (a) {
    k(h(a)) && (a.preventDefault(), a.stopPropagation());
  }, !0);
});Object.defineProperty(Element.prototype, "inert", { enumerable: !0, get: function get() {
    return this.hasAttribute("inert");
  }, set: function set(e) {
    e ? this.setAttribute("inert", "") : this.removeAttribute("inert");
  } });

var focusableElements = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable], audio[controls], video[controls]';

var keyCodes = {
  esc: 27,
  tab: 9,
  upArrow: 38,
  rightArrow: 39,
  downArrow: 40,
  leftArrow: 37
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var ButaneSideNav = function () {
  function ButaneSideNav(element) {
    classCallCheck(this, ButaneSideNav);

    this.showButton = element;
    this.sideNavId = this.showButton.getAttribute('data-butane-sidenav-controls');
    this.sideNav = document.querySelector('#' + this.sideNavId);
    this.focusableElements = Array.from(this.sideNav.querySelectorAll(focusableElements));
    this.hideElements = this.sideNav.querySelectorAll('[data-butane-sidenav-hide]');
    this.shown = false;
    this.previousActiveElement = null;
    this.sideNav.inert = true;
    this.focusableElements.forEach(function (element) {
      element.setAttribute('tabindex', -1);
    });

    // Prebind the functions that will be bound in
    // addEventListener and removeEventListener to
    // avoid losing references
    this._show = this.show.bind(this);
    this._hide = this.hide.bind(this);
    this._bindKeyPress = this.bindKeyPress.bind(this);

    this.addEventListeners();
  }

  createClass(ButaneSideNav, [{
    key: 'addEventListeners',
    value: function addEventListeners() {
      var _this = this;

      this.showButton.addEventListener('click', this._show);
      Array.from(this.hideElements).forEach(function (element) {
        element.addEventListener('click', _this._hide);
      });
      document.addEventListener('keydown', this._bindKeyPress);
    }
  }, {
    key: 'show',
    value: function show() {
      this.previousActiveElement = document.activeElement;
      this.shown = true;
      this.sideNav.classList.add('is-active');
      this.sideNav.removeAttribute('inert');

      if (this.focusableElements.length > 0) {
        this.focusableElements.forEach(function (element) {
          element.setAttribute('tabindex', 0);
        });
        this.focusableElements[0].focus();
      }
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.shown = false;
      this.sideNav.classList.remove('is-active');
      this.sideNav.inert = true;

      if (this.focusableElements.length > 0) {
        this.focusableElements.forEach(function (element) {
          element.setAttribute('tabindex', -1);
        });
      }

      this.previousActiveElement.focus();
    }
  }, {
    key: 'bindKeyPress',
    value: function bindKeyPress(e) {
      if (this.shown) {
        if (e.keyCode === keyCodes.esc) {
          this._hide(e);
        }
      }
    }
  }]);
  return ButaneSideNav;
}();

var init = function init() {
  var butaneSideNavs = document.querySelectorAll('[data-butane-sidenav-controls]');

  Array.from(butaneSideNavs).forEach(function (sideNav) {
    new ButaneSideNav(sideNav);
  });
};

var main = { init: init };

return main;

})));
