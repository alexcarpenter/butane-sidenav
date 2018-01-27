import 'wicg-inert'

const ButaneSidenav = (() => {
  const FOCUSABLE_ELEMENTS = [
    'a[href]',
    'area[href]',
    'input:not([disabled]):not([type="hidden"]):not([aria-hidden])',
    'select:not([disabled]):not([aria-hidden])',
    'textarea:not([disabled]):not([aria-hidden])',
    'button:not([disabled]):not([aria-hidden])',
    'iframe',
    'object',
    'embed',
    '[contenteditable]',
    '[tabindex]:not([tabindex^="-"])'
  ]

  class Sidenav {
    constructor({
      containerEl,
      trigger,
      targetSidenav,
      hideSelector = 'data-butane-sidenav-hide',
      activeClass = 'is-active',
      onShow = () => {},
      onHide = () => {}
    }) {
      this.containerEl = containerEl
      this.trigger = trigger
      this.sidenav = document.getElementById(targetSidenav)
      this.config = { hideSelector, activeClass, onShow, onHide }

      if (!this.sidenav) {
        throw new Error(
          `butane-sidenav cannot find a sidenav element with an id of '${targetSidenav}'`
        )
      }

      this.sidenav.inert = true

      this.trigger.addEventListener('click', () => this.showSidenav())

      this.onClick = this.onClick.bind(this)
      this.onKeydown = this.onKeydown.bind(this)
    }

    addEventListeners() {
      document.addEventListener('click', this.onClick)
      document.addEventListener('keydown', this.onKeydown)
    }

    removeEventListeners() {
      document.removeEventListener('click', this.onClick)
      document.removeEventListener('keydown', this.onKeydown)
    }

    showSidenav() {
      this.activeElement = document.activeElement
      this.containerEl.inert = true
      this.sidenav.inert = false
      this.sidenav.classList.add(this.config.activeClass)
      this.setFocusToFirstNode()
      this.addEventListeners()
      this.config.onShow(this.sidenav)
    }

    hideSidenav() {
      this.containerEl.inert = false
      this.sidenav.inert = true
      this.sidenav.classList.remove(this.config.activeClass)
      this.removeEventListeners()
      this.config.onHide(this.sidenav)
      this.activeElement.focus()
    }

    getFocusableNodes() {
      const nodes = this.sidenav.querySelectorAll(FOCUSABLE_ELEMENTS)
      return Object.keys(nodes).map(key => nodes[key])
    }

    setFocusToFirstNode() {
      const focusableNodes = this.getFocusableNodes()
      if (focusableNodes.length) focusableNodes[0].focus()
    }

    onClick(event) {
      if (event.target.hasAttribute(this.config.hideSelector)) {
        this.hideSidenav()
        event.preventDefault()
      }
    }

    onKeydown(event) {
      if (event.keyCode === 27) this.hideSidenav(event)
    }
  }

  const init = config => {
    const options = Object.assign(
      {},
      {
        containerSelector: 'data-butane-sidenav-container',
        showSelector: 'data-butane-sidenav-show'
      },
      config
    )

    const containerEl = document.querySelector(`[${options.containerSelector}]`)

    if (!containerEl) {
      throw new Error(
        `butane-sidenav requires a container element with a data attribute of '${options.containerSelector}'`
      )
    }

    const triggers = Array.from(
      document.querySelectorAll(`[${options.showSelector}]`)
    )

    if (triggers.length <= 0) {
      return
    }

    triggers.forEach(trigger => {
      options.containerEl = containerEl
      options.trigger = trigger
      options.targetSidenav =
        options.trigger.attributes[options.showSelector].value
      new Sidenav(options)
    })
  }

  return { init }
})()

export default ButaneSidenav
