/** @license LGPL-3.0-or-later
 * Copyright 2019, 2020, 2023 Sebastian Spautz.
 *
 * This File is Part of "SITWebComponents"
 * <https://github.com/sebastiansIT/SHSWebComponents>.
 *
 * SITWebComponents is free software: you can redistribute it and/or modify
 * it under the terms of the Lesser GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * SITWebComponents is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * Lesser GNU General Public License for more details.
 *
 * You should have received a copy of the Lesser GNU General Public License
 * along with SITWebComponents. If not, see <http://www.gnu.org/licenses/>.
 */

/* global HTMLElement, CustomEvent, FileReader */

/** The base for all HTML elements.
 * @external HTMLElement
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement|MDN web docs}
 */

/** The template HTML element.
 * @external HTMLTemplateElement
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement|MDN web docs}
 */

/** The button HTML element.
 * @external HTMLFormElement
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement|MDN web docs}
 */

/** The button HTML element.
 * @external HTMLButtonElement
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLButtonElement|MDN web docs}
 */

/** The img HTML element.
 * @external HTMLImageElement
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement|MDN web docs}
 */

/** List of DOM nodes.
 * @external NodeList
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/NodeList|MDN web docs}
 */

/** Reader for files.
 * Allows us to read the image files.
 * @external FileReader
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/FileReader|MDN web docs}
 */

/** Interface for custom events.
 * @external CustomEvent
 * @see {@link https://developer.mozilla.org/de/docs/Web/API/CustomEvent|MDN web docs}
 */

/** Interface for ElementInternals.
 * @external ElementInternals
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals|MDN web docs}
 */

/** Interface for ShadowRoot.
 * @external ShadowRoot
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot|MDN web docs}
 */

/** Contains a WebComponent that acts as a form element to select images.
 * @module SelectImage
 */

/** The default label for the button to select a image from the computers storage.
 * @constant {string}
 */
const DEFAULT_SELECT_IMAGE_LABEL = 'Select'

/**
 * The default label for the button to reset the image to its inital value.
 * @constant {string}
 */
const DEFAULT_CLEAR_IMAGE_LABEL = 'Reset'

/** Template for the shadow DOM of the custom element SelectImage
 * (alias sit-select-image).
 * @constant {external:HTMLTemplateElement}
 */
const TEMPLATE = document.createElement('template')
TEMPLATE.innerHTML = `
  <style>
    :host {
      display: inline-flex;
      position: relative;
      align-content: center;
      justify-content: center;
    }

    img {
      display: none;
      min-width: inherit;
      width: inherit;
      max-width: inherit;
      min-height: inherit;
      height: inherit;
      max-height: inherit;
    }

    img[src] {
      display: inline;
    }

    #imagecontrols {
      position: absolute;
      bottom: 0;
      right: 0;
      font: inherit;
      text-align: right;
    }

    @media print {
      #imagecontrols {
        display: none;
      }
    }

    /* Selects ths controls inside the shadow root host, only if the host is readonly */
    :host([readonly]) #imagecontrols {
      display: none;
    }
  </style>
  <img alt="" />
  <span id="imagecontrols" part="sit-select-image-toolbar">
    <button id="selectImage" type="button"
      part="sit-select-image-select-button">${DEFAULT_SELECT_IMAGE_LABEL}</button>
    <button id="clearImage" type="button" disabled="disabled"
      part="sit-select-image-reset-button">${DEFAULT_CLEAR_IMAGE_LABEL}</button>
  </span>
`

/** Custom Element for selecting images in a HTML page.
 * @class
 * @customElement sit-select-image
 * @augments external:HTMLElement
 */
class SelectImageElement extends HTMLElement {
  /** Marks custom element as form item element.
   * @see external:ElementInternals
   * @static
   * @readonly
   * @type {boolean}
   */
  static formAssociated = true

  /** The internals of the custom element.
   * @readonly
   * @type external:ElementInternals
   * @private
   */
  #internals

  /** Internal field to store the inital value (an image) of the element.
   * @see module:sebastiansit/webcomponents/selectimage~SelectImage#defaultValue
   * @private
   * @member {string}
   */
  #defaultValue = undefined

  /** Internal field to get access to the shadow root of the custom element.
   * @see external:ElementInternals
   * @private
   * @readonly
   * @type {external:ShadowRoot}
   */
  #shadowRoot

  /** Internal field to get access to the image element inside of the custom element.
   * @private
   * @readonly
   * @type {external:HTMLImageElement}
   */
  #image

  /** Internal field for the button "select" in the shadow DOM.
   * @private
   * @member {external:HTMLButtonElement}
   */
  #selectButton

  /** Internal field for the button "revert" in the shadow DOM.
   * @private
   * @member {external:HTMLButtonElement}
   */
  #revertButton

  constructor () {
    super()
    this.#internals = this.attachInternals()

    this.#shadowRoot = this.attachShadow({ mode: 'open' })
    this.#shadowRoot.appendChild(TEMPLATE.content.cloneNode(true))
    this.#image = this.#shadowRoot.querySelector('img')
    this.#selectButton = this.#shadowRoot.querySelector('#selectImage')
    this.#revertButton = this.#shadowRoot.querySelector('#clearImage')

    this.#initSelectImageElement()
  }

  /* =======================================================================
     ============================ Properties ===============================
     ======================================================================= */

  get value () {
    return this.getAttribute('value')
  }

  /** The value of the SelectImageElement.
   * @type {string}
   * @param {string} value - The new value to set.
   * @fires module:sebastiansit/webcomponents/selectimage~SelectImageElement#change
   */
  set value (value) {
    if (value) {
      this.setAttribute('value', value)
    } else {
      this.removeAttribute('value')
    }

    // In fact of execution order normaly the event is dipatched before the
    // render prozess showing the new Image. The timeout reoder the execution.
    window.setTimeout(() => {
      this.dispatchEvent(
        new CustomEvent('change', { detail: { value } })
      )
    }, 0)
  }

  /** The inital value (an image) of the element.
   *
   * @readonly
   * @type {string}
   * @example <caption>Select the first SelectImage element and read the default value.</caption>
   * const defaultValue = document.getElementsByTagName('sit-select-image')[0].defaultValue
   */
  get defaultValue () {
    return this.#defaultValue
  }

  /* =============== Properties inherit by ElementInternals ================ */
  /** The form element associated with.
   * @see external:ElementInternals
   * @readonly
   * @type {external:HTMLFormElement|undefined}
   */
  get form () {
    return this.#internals.form
  }

  /** The labels associated with this element.
   * @see external:ElementInternals
   * @readonly
   * @type {external:NodeList}
   */
  get labels () {
    return this.#internals.labels
  }

  /** Returns the ShadowRoot object associated with this element.
   * @see external:ElementInternals
   * @readonly
   * @type {external:ShadowRoot}
   */
  get shadowRoot () {
    return this.#internals.shadowRoot
  }

  /** A string containing the validation message of this element.
   * @see external:ElementInternals
   * @readonly
   * @type {string}
   */
  get validationMessage () {
    return this.#internals.validationMessage
  }

  /* getter and setter for title attribute are part of HTMLElement */

  /* =======================================================================
     ========================== Private Methods =============================
     ======================================================================= */
  // TODO Test each comination of image and default inkl. null and undefinded
  /** Validate the value of this element.
   * @returns {undefined}
   * @private
   */
  #validate () {
    const required = this.hasAttribute('required') && (this.getAttribute('required') === '' || this.getAttribute('required') === 'required')
    if (required) {
      if (!this.#image.src || this.#image.src === this.#defaultValue) {
        this.#internals.setValidity({ valueMissing: true }, 'You need a Picture') // TODO add a map for i18n
        return
      }
    }
    this.#internals.setValidity({})
  }

  /** Inits a SelectImage element. Primarily it adds event listener to the
   * elements in the shadow DOM.
   * @private
   * @returns {undefined}
   */
  #initSelectImageElement () {
    const selectButton = this.#selectButton
    const clearButton = this.#revertButton

    selectButton.addEventListener('click', (event) => {
      event.stopPropagation()
      event.preventDefault()

      this.select()
      clearButton.disabled = false
    })

    clearButton.addEventListener('click', (event) => {
      event.stopPropagation()
      event.preventDefault()

      this.revert()
    })
  }

  /* =======================================================================
     ========================== Public Methods =============================
     ======================================================================= */

  /** Select an image from the lokal systems storage.
   * This function can only be called in direct response to a user interaction.
   * Other calls will be ignored by the user agend.
   * @returns {undefined}
   * @fires module:sebastiansit/webcomponents/selectimage~SelectImageElement#change
   */
  select () {
    const fileInput = document.createElement('input')
    fileInput.setAttribute('type', 'file')
    fileInput.setAttribute('accept', 'image/*')
    fileInput.addEventListener('change', function (event) {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader()
        reader.onload = function (event) {
          this.value = event.target.result
        }.bind(this)
        reader.readAsDataURL(event.target.files[0])
      }
    }.bind(this))
    fileInput.click()
  }

  /** Reset the element to the inital image if one is available.
   * The inital value is accessable with the defaultValue property.
   * @returns {undefined}
   * @fires module:sebastiansit/webcomponents/selectimage~SelectImageElement#change
   */
  revert () {
    this.value = this.defaultValue
    this.#revertButton.disabled = true
  }

  /** Remove the actual image. Unlike revert(), the default value is ignored.
   * @returns {undefined}
   * @fires module:sebastiansit/webcomponents/selectimage~SelectImageElement#change
   */
  clear () {
    this.value = undefined
    if (!this.defaultValue) {
      this.#revertButton.disabled = true
    }
  }

  /* =============== Methods inherit by ElementInternals ================ */

  /** Checks if an element meets any constraint validation rules applied to it.
   * @see {external:ElementInternals}
   * @returns {boolean} A boolean value, true if the element meets all validation constraints.
   */
  checkValidity () {
    return this.#internals.checkValidity()
  }

  /** Checks if an element meets any constraint validation rules applied to it, and also sends a validation message to the user agent.
   * @see {external:ElementInternals}
   * @returns {boolean} A boolean value, true if the element meets all validation constraints.
   */
  reportValidity () {
    return this.#internals.reportValidity()
  }

  /* =======================================================================
     =================== Lifecycle of Custom Elements ======================
     ======================================================================= */

  connectedCallback () {
    this.#defaultValue = this.value
    // DEBUG: console.log(`Associated Form: ${this.#internals.form?.id || this.#internals.form?.name || this.#internals.form?.action}`);
  }

  static get observedAttributes () {
    return ['value', 'alt', 'disabled', 'required', 'selectlabel', 'clearlabel']
  }

  attributeChangedCallback (name, oldVal, newVal) {
    switch (name) {
      case 'value':
        if (newVal !== oldVal) {
          if (!newVal) {
            this.#image.removeAttribute('src')
            this.#revertButton.disabled = true
          } else {
            this.#image.src = newVal
            this.#revertButton.disabled = false
          }
          // Set the formular element value for form submiting
          if (this.#image.src === this.#defaultValue) {
            this.#internals.setFormValue('')
          } else {
            this.#internals.setFormValue(this.#image.src || '')
          }
        }
        this.#validate()
        break
      case 'alt':
        if (!newVal) {
          this.#image.alt = ''
        } else {
          this.#image.alt = newVal
        }
        break
      case 'disabled':
        if (newVal === '' || newVal === 'disabled') {
          this.#selectButton.disabled = true
          this.#revertButton.disabled = true
        } else {
          this.#selectButton.removeAttribute('disabled')
          this.#revertButton.removeAttribute('disabled')
        }
        break
      case 'required':
        this.#validate()
        break
      case 'selectlabel':
        if (!newVal) {
          this._selectButton.innerText = DEFAULT_SELECT_IMAGE_LABEL
        } else {
          this.#selectButton.innerText = newVal
        }
        break
      case 'clearlabel':
        if (!newVal) {
          this._revertButton.innerText = DEFAULT_SELECT_IMAGE_LABEL
        } else {
          this.#revertButton.innerText = newVal
        }
        break
    }
  }
}

/** Event fired when the value of the SelectImage element is changed.
 * @event module:sebastiansit/webcomponents/selectimage~SelectImageElement#change
 * @type {external:CustomEvent}
 * @property {object} detail - The detail information about the event.
 * @property {string} detail.value - The new value of the SelectImage-Element.
 */

/* Register the custom element SelectImage with tag name "sit-select-image". */
window.customElements.define('sit-select-image', SelectImageElement)
