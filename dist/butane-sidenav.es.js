"undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self&&self;var e;(function(e,t){var n,r,i;n=function(e,t){var n=window.Element.prototype,r=n.matches||n.mozMatchesSelector||n.msMatchesSelector||n.oMatchesSelector||n.webkitMatchesSelector;if(!e||1!==e.nodeType)return!1;var i=e.parentNode;if(r)return r.call(e,t);for(var o=i.querySelectorAll(t),a=o.length,s=0;s<a;s++)if(o[s]===e)return!0;return!1},r=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")},i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),function(e){var t=Array.prototype.slice,o=["a[href]","area[href]","input:not([disabled])","select:not([disabled])","textarea:not([disabled])","button:not([disabled])","iframe","object","embed","[contenteditable]"].join(","),a=function(){function a(e,t){r(this,a),this._inertManager=t,this._rootElement=e,this._managedNodes=new Set([]),this._rootElement.hasAttribute("aria-hidden")&&(this._savedAriaHidden=this._rootElement.getAttribute("aria-hidden")),this._rootElement.setAttribute("aria-hidden","true"),this._makeSubtreeUnfocusable(this._rootElement),this._observer=new MutationObserver(this._onMutation.bind(this)),this._observer.observe(this._rootElement,{attributes:!0,childList:!0,subtree:!0})}return i(a,[{key:"destructor",value:function(){this._observer.disconnect(),this._observer=null,this._rootElement&&(this.hasSavedAriaHidden?this._rootElement.setAttribute("aria-hidden",this.savedAriaHidden):this._rootElement.removeAttribute("aria-hidden")),this._rootElement=null;var e=!0,t=!1,n=void 0;try{for(var r,i=this._managedNodes[Symbol.iterator]();!(e=(r=i.next()).done);e=!0){var o=r.value;this._unmanageNode(o.node)}}catch(e){t=!0,n=e}finally{try{!e&&i.return&&i.return()}finally{if(t)throw n}}this._managedNodes=null,this._inertManager=null}},{key:"_makeSubtreeUnfocusable",value:function(t){var n=this;u(t,function(e){return n._visitNode(e)});var r=e.activeElement;if(!l(e.body,t)){for(var i=t,o=void 0;i;){if(i.nodeType===Node.DOCUMENT_FRAGMENT_NODE){o=i;break}i=i.parentNode}o&&(r=o.activeElement)}l(t,r)&&r.blur()}},{key:"_visitNode",value:function(e){e.nodeType===Node.ELEMENT_NODE&&(e!==this._rootElement&&e.hasAttribute("inert")&&this._adoptInertRoot(e),(n(e,o)||e.hasAttribute("tabindex"))&&this._manageNode(e))}},{key:"_manageNode",value:function(e){var t=this._inertManager.register(e,this);this._managedNodes.add(t)}},{key:"_unmanageNode",value:function(e){var t=this._inertManager.deregister(e,this);t&&this._managedNodes.delete(t)}},{key:"_unmanageSubtree",value:function(e){var t=this;u(e,function(e){return t._unmanageNode(e)})}},{key:"_adoptInertRoot",value:function(e){var t=this._inertManager.getInertRoot(e);t||(this._inertManager.setInert(e,!0),t=this._inertManager.getInertRoot(e));var n=!0,r=!1,i=void 0;try{for(var o,a=t.managedNodes[Symbol.iterator]();!(n=(o=a.next()).done);n=!0){var s=o.value;this._manageNode(s.node)}}catch(e){r=!0,i=e}finally{try{!n&&a.return&&a.return()}finally{if(r)throw i}}}},{key:"_onMutation",value:function(e,n){var r=!0,i=!1,o=void 0;try{for(var a,s=e[Symbol.iterator]();!(r=(a=s.next()).done);r=!0){var d=a.value,u=d.target;if("childList"===d.type){var h=!0,c=!1,v=void 0;try{for(var f,y=t.call(d.addedNodes)[Symbol.iterator]();!(h=(f=y.next()).done);h=!0){var b=f.value;this._makeSubtreeUnfocusable(b)}}catch(e){c=!0,v=e}finally{try{!h&&y.return&&y.return()}finally{if(c)throw v}}var _=!0,m=!1,g=void 0;try{for(var w,p=t.call(d.removedNodes)[Symbol.iterator]();!(_=(w=p.next()).done);_=!0){var E=w.value;this._unmanageSubtree(E)}}catch(e){m=!0,g=e}finally{try{!_&&p.return&&p.return()}finally{if(m)throw g}}}else if("attributes"===d.type)if("tabindex"===d.attributeName)this._manageNode(u);else if(u!==this._rootElement&&"inert"===d.attributeName&&u.hasAttribute("inert")){this._adoptInertRoot(u);var N=this._inertManager.getInertRoot(u),S=!0,k=!1,I=void 0;try{for(var x,A=this._managedNodes[Symbol.iterator]();!(S=(x=A.next()).done);S=!0){var M=x.value;l(u,M.node)&&N._manageNode(M.node)}}catch(e){k=!0,I=e}finally{try{!S&&A.return&&A.return()}finally{if(k)throw I}}}}}catch(e){i=!0,o=e}finally{try{!r&&s.return&&s.return()}finally{if(i)throw o}}}},{key:"managedNodes",get:function(){return new Set(this._managedNodes)}},{key:"hasSavedAriaHidden",get:function(){return"_savedAriaHidden"in this}},{key:"savedAriaHidden",set:function(e){this._savedAriaHidden=e},get:function(){return this._savedAriaHidden}}]),a}(),s=function(){function e(t,n){r(this,e),this._node=t,this._overrodeFocusMethod=!1,this._inertRoots=new Set([n]),this._destroyed=!1,this.ensureUntabbable()}return i(e,[{key:"destructor",value:function(){this._throwIfDestroyed(),this._node&&(this.hasSavedTabIndex?this._node.setAttribute("tabindex",this.savedTabIndex):this._node.removeAttribute("tabindex"),this._overrodeFocusMethod&&delete this._node.focus),this._node=null,this._inertRoots=null,this._destroyed=!0}},{key:"_throwIfDestroyed",value:function(){if(this.destroyed)throw new Error("Trying to access destroyed InertNode")}},{key:"ensureUntabbable",value:function(){var e=this.node;if(n(e,o)){if(-1===e.tabIndex&&this.hasSavedTabIndex)return;e.hasAttribute("tabindex")&&(this._savedTabIndex=e.tabIndex),e.setAttribute("tabindex","-1"),e.nodeType===Node.ELEMENT_NODE&&(e.focus=function(){},this._overrodeFocusMethod=!0)}else e.hasAttribute("tabindex")&&(this._savedTabIndex=e.tabIndex,e.removeAttribute("tabindex"))}},{key:"addInertRoot",value:function(e){this._throwIfDestroyed(),this._inertRoots.add(e)}},{key:"removeInertRoot",value:function(e){this._throwIfDestroyed(),this._inertRoots.delete(e),0===this._inertRoots.size&&this.destructor()}},{key:"destroyed",get:function(){return this._destroyed}},{key:"hasSavedTabIndex",get:function(){return"_savedTabIndex"in this}},{key:"node",get:function(){return this._throwIfDestroyed(),this._node}},{key:"savedTabIndex",set:function(e){this._throwIfDestroyed(),this._savedTabIndex=e},get:function(){return this._throwIfDestroyed(),this._savedTabIndex}}]),e}(),d=function(){function e(t){if(r(this,e),!t)throw new Error("Missing required argument; InertManager needs to wrap a document.");this._document=t,this._managedNodes=new Map,this._inertRoots=new Map,this._observer=new MutationObserver(this._watchForInert.bind(this)),h(t.head||t.body||t.documentElement),"loading"===t.readyState?t.addEventListener("DOMContentLoaded",this._onDocumentLoaded.bind(this)):this._onDocumentLoaded()}return i(e,[{key:"setInert",value:function(e,t){if(t){if(this._inertRoots.has(e))return;var n=new a(e,this);if(e.setAttribute("inert",""),this._inertRoots.set(e,n),!l(this._document.body,e))for(var r=e.parentNode;r;)11===r.nodeType&&h(r),r=r.parentNode}else{if(!this._inertRoots.has(e))return;var i=this._inertRoots.get(e);i.destructor(),this._inertRoots.delete(e),e.removeAttribute("inert")}}},{key:"getInertRoot",value:function(e){return this._inertRoots.get(e)}},{key:"register",value:function(e,t){var n=this._managedNodes.get(e);return void 0!==n?(n.addInertRoot(t),n.ensureUntabbable()):n=new s(e,t),this._managedNodes.set(e,n),n}},{key:"deregister",value:function(e,t){var n=this._managedNodes.get(e);return n?(n.removeInertRoot(t),n.destroyed&&this._managedNodes.delete(e),n):null}},{key:"_onDocumentLoaded",value:function(){var e=t.call(this._document.querySelectorAll("[inert]")),n=!0,r=!1,i=void 0;try{for(var o,a=e[Symbol.iterator]();!(n=(o=a.next()).done);n=!0){var s=o.value;this.setInert(s,!0)}}catch(e){r=!0,i=e}finally{try{!n&&a.return&&a.return()}finally{if(r)throw i}}this._observer.observe(this._document.body,{attributes:!0,subtree:!0,childList:!0})}},{key:"_watchForInert",value:function(e,r){var i=!0,o=!1,a=void 0;try{for(var s,d=e[Symbol.iterator]();!(i=(s=d.next()).done);i=!0){var u=s.value;switch(u.type){case"childList":var h=!0,l=!1,c=void 0;try{for(var v,f=t.call(u.addedNodes)[Symbol.iterator]();!(h=(v=f.next()).done);h=!0){var y=v.value;if(y.nodeType===Node.ELEMENT_NODE){var b=t.call(y.querySelectorAll("[inert]"));n(y,"[inert]")&&b.unshift(y);var _=!0,m=!1,g=void 0;try{for(var w,p=b[Symbol.iterator]();!(_=(w=p.next()).done);_=!0){var E=w.value;this.setInert(E,!0)}}catch(e){m=!0,g=e}finally{try{!_&&p.return&&p.return()}finally{if(m)throw g}}}}}catch(e){l=!0,c=e}finally{try{!h&&f.return&&f.return()}finally{if(l)throw c}}break;case"attributes":if("inert"!==u.attributeName)continue;var N=u.target,S=N.hasAttribute("inert");this.setInert(N,S)}}}catch(e){o=!0,a=e}finally{try{!i&&d.return&&d.return()}finally{if(o)throw a}}}}]),e}();function u(e,t,n){if(e.nodeType==Node.ELEMENT_NODE){var r=e;t&&t(r);var i=r.shadowRoot||r.webkitShadowRoot;if(i)return void u(i,t,i);if("content"==r.localName){for(var o=r,a=o.getDistributedNodes?o.getDistributedNodes():[],s=0;s<a.length;s++)u(a[s],t,n);return}if("slot"==r.localName){for(var d=r,h=d.assignedNodes?d.assignedNodes({flatten:!0}):[],l=0;l<h.length;l++)u(h[l],t,n);return}}for(var c=e.firstChild;null!=c;)u(c,t,n),c=c.nextSibling}function h(t){if(!t.querySelector("style#inert-style")){var n=e.createElement("style");n.setAttribute("id","inert-style"),n.textContent="\n[inert] {\n  pointer-events: none;\n  cursor: default;\n}\n\n[inert], [inert] * {\n  user-select: none;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n}\n",t.appendChild(n)}}function l(e,t){return t&&(e===t||!!(16&e.compareDocumentPosition(t)))}var c=new d(e);Object.defineProperty(Element.prototype,"inert",{enumerable:!0,get:function(){return this.hasAttribute("inert")},set:function(e){c.setInert(this,e)}})}(document)})(e={exports:{}},e.exports);export default function(){var e=["a[href]","area[href]",'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',"select:not([disabled]):not([aria-hidden])","textarea:not([disabled]):not([aria-hidden])","button:not([disabled]):not([aria-hidden])","iframe","object","embed","[contenteditable]",'[tabindex]:not([tabindex^="-"])'],t=function(e){var t=this,n=e.trigger,r=e.targetSidenav,i=e.hideSelector;void 0===i&&(i="data-butane-sidenav-hide");var o=e.activeClass;void 0===o&&(o="is-active");var a=e.onShow;void 0===a&&(a=function(){});var s=e.onHide;if(void 0===s&&(s=function(){}),this.containerEl=e.containerEl,this.trigger=n,this.sidenav=document.getElementById(r),this.config={hideSelector:i,activeClass:o,onShow:a,onHide:s},!this.sidenav)throw new Error("butane-sidenav cannot find a sidenav element with an id of '"+r+"'");this.sidenav.inert=!0,this.trigger.addEventListener("click",function(){return t.showSidenav()}),this.onClick=this.onClick.bind(this),this.onKeydown=this.onKeydown.bind(this)};t.prototype.addEventListeners=function(){document.addEventListener("click",this.onClick),document.addEventListener("keydown",this.onKeydown)},t.prototype.removeEventListeners=function(){document.removeEventListener("click",this.onClick),document.removeEventListener("keydown",this.onKeydown)},t.prototype.showSidenav=function(){this.activeElement=document.activeElement,this.containerEl.inert=!0,this.sidenav.inert=!1,this.sidenav.classList.add(this.config.activeClass),this.setFocusToFirstNode(),this.addEventListeners(),this.config.onShow(this.sidenav)},t.prototype.hideSidenav=function(){this.containerEl.inert=!1,this.sidenav.inert=!0,this.sidenav.classList.remove(this.config.activeClass),this.removeEventListeners(),this.config.onHide(this.sidenav),this.activeElement.focus()},t.prototype.getFocusableNodes=function(){var t=this.sidenav.querySelectorAll(e);return Object.keys(t).map(function(e){return t[e]})},t.prototype.setFocusToFirstNode=function(){var e=this.getFocusableNodes();e.length&&e[0].focus()},t.prototype.onClick=function(e){e.target.hasAttribute(this.config.hideSelector)&&(this.hideSidenav(),e.preventDefault())},t.prototype.onKeydown=function(e){27===e.keyCode&&this.hideSidenav(e)};return{init:function(e){var n=Object.assign({},{containerSelector:"data-butane-sidenav-container",showSelector:"data-butane-sidenav-show"},e),r=document.querySelector("["+n.containerSelector+"]");if(!r)throw new Error("butane-sidenav requires a container element with a data attribute of '"+n.containerSelector+"'");var i=Array.from(document.querySelectorAll("["+n.showSelector+"]"));i.length<=0||i.forEach(function(e){n.containerEl=r,n.trigger=e,n.targetSidenav=n.trigger.attributes[n.showSelector].value,new t(n)})}}}();
//# sourceMappingURL=butane-sidenav.es.js.map
