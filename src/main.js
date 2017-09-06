'use strict'

import 'inert-polyfill'
import { focusableElements, keyCodes } from './utils'

class ButaneSideNav {
  constructor (element, options) {
    this.showButton = element
    this.sideNavId = this.showButton.getAttribute('data-butane-sidenav-controls')
    this.sideNav = document.querySelector(`#${this.sideNavId}`)
    this.focusableElements = Array.from(
      this.sideNav.querySelectorAll(focusableElements)
    )
    this.options = {
      contentContainer: options.contentContainer ? options.contentContainer : '#main'
    }
    this.contentContainer = document.querySelector(this.options.contentContainer)
    this.hideElements = this.sideNav.querySelectorAll('[data-butane-sidenav-hide]')
    this.shown = false
    this.previousActiveElement = null
    this.sideNav.inert = true
    this.focusableElements.forEach(element => {
      element.setAttribute('tabindex', -1)
    })

    // Prebind the functions that will be bound in
    // addEventListener and removeEventListener to
    // avoid losing references
    this._show = this.show.bind(this)
    this._hide = this.hide.bind(this)
    this._bindKeyPress = this.bindKeyPress.bind(this)

    this.addEventListeners()
  }

  addEventListeners () {
    this.showButton.addEventListener('click', this._show)
    Array.from(this.hideElements).forEach(element => {
      element.addEventListener('click', this._hide)
    })
    document.addEventListener('keydown', this._bindKeyPress)
  }

  show () {
    this.previousActiveElement = document.activeElement
    this.shown = true
    this.sideNav.classList.add('is-active')
    this.sideNav.removeAttribute('inert')
    this.contentContainer.inert = true

    if (this.focusableElements.length > 0) {
      this.focusableElements.forEach(element => {
        element.setAttribute('tabindex', 0)
      })
      this.focusableElements[0].focus()
    }
  }

  hide () {
    this.shown = false
    this.sideNav.classList.remove('is-active')
    this.sideNav.inert = true
    this.contentContainer.removeAttribute('inert')

    if (this.focusableElements.length > 0) {
      this.focusableElements.forEach(element => {
        element.setAttribute('tabindex', -1)
      })
    }

    this.previousActiveElement.focus()
  }

  bindKeyPress (e) {
    if (this.shown) {
      if (e.keyCode === keyCodes.esc) {
        this._hide(e)
      }
    }
  }
}

const init = (options = {}) => {
  const butaneSideNavs = document.querySelectorAll('[data-butane-sidenav-controls]')

  Array.from(butaneSideNavs).forEach(sideNav => {
    new ButaneSideNav(sideNav, options) // eslint-disable-line no-new
  })
}

export default { init }
