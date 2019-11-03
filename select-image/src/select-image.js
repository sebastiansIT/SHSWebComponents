/*  Copyright 2019 Sebastian Spautz

    This File is Part of "SITWebComponents"
    <https://github.com/sebastiansIT/SHSWebComponents>.

    SITWebComponents is free software: you can redistribute it and/or modify
    it under the terms of the Lesser GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    SITWebComponents is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    Lesser GNU General Public License for more details.

    You should have received a copy of the Lesser GNU General Public License
    along with SITWebComponents. If not, see <http://www.gnu.org/licenses/>.
*/

/** The base for all HTML elements.
 * @external HTMLElement
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement|MDN web docs}
 */
/** The template HTML element.
  * @external HTMLTemplateElement
  * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLTemplateElement|MDN web docs}
  */
/** Reader for files.
  * Allows us to read the image files.
  * @external FileReader
  * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/FileReader|MDN web docs}
  */

/** Contains a WebComponent that acts as a form element to select images.
  * @module sebastiansit/webcomponents/selectimage
  */

/** The default label for the button to select a image from the computers storage.
  * @const {string}
  */
const DEFAULT_SELECT_IMAGE_LABEL = 'Select'
/** The default label for the button to reset the image to its inital value.
  * @const {string}
  */
const DEFAULT_CLEAR_IMAGE_LABEL = 'Reset'
/** Template for the shadow DOM of the custom element SelectImage
  * (alias sit-select-image).
  * @const {external:HTMLTemplateElement}
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

    @supports(background:revert) {
      button {
        width: var(--sit-button-width, revert);
        background: var(--sit-button-background, revert);
        margin: var(--sit-button-margin, revert);
        border: var(--sit-button-border, revert);
        border-radius: var(--sit-button-radius, revert);
        padding: var(--sit-button-padding, revert);
        font: var(--sit-button-font, revert);
      }
      button:hover:not([disabled]) {
        border: var(--sit-button-hover-border, revert);
        text-decoration: var(--sit-button-hover-decoration, revert);
      }
      button:focus {
        border: var(--sit-button-focus-border, revert);
        text-decoration: var(--sit-button-focus-decoration, revert);
      }
      button:active {
        background: var(--sit-button-active-background, revert);
        border: var(--sit-button-active-border, revert);
      }
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
    <button id="clearImage" type="button"
      part="sit-select-image-reset-button">${DEFAULT_CLEAR_IMAGE_LABEL}</button>
  </span>
`

/** Custom Element for selecting images in a HTML page.
  * @class
  * @customelement sit-select-image
  * @extends external:HTMLElement
  */
class SelectImage extends HTMLElement {
  constructor () {
    super()

    /** Internal field to store the inital value (an image) of the element.
      * @see module:sebastiansit/webcomponents/selectimage~SelectImage#defaultValue
      * @private
      * @member {string}
      */
    this._defaultValue = undefined
    this._shadowRoot = this.attachShadow({ mode: 'open' })
    this._shadowRoot.appendChild(TEMPLATE.content.cloneNode(true))
    this._image = this._shadowRoot.querySelector('img')
    this._selectButton = this._shadowRoot.querySelector('#selectImage')
    this._clearButton = this._shadowRoot.querySelector('#clearImage')

    initSelectImageElement(this)
  }

  get value () {
    return this.getAttribute('value')
  }

  set value (value) {
    if (value) {
      this.setAttribute('value', value)
    } else {
      this.removeAttribute('value')
    }
  }

  /** The inital value (an image) of the element
    * @readonly
    * @type {string}
    */
  get defaultValue () {
    return this._defaultValue
  }

  /* getter and setter for title attribute are part of HTMLElement */

  connectedCallback () {
    this._defaultValue = this.value
  }

  static get observedAttributes () {
    return ['value', 'alt', 'disabled', 'selectlabel', 'clearlabel']
  }

  attributeChangedCallback (name, oldVal, newVal) {
    switch (name) {
      case 'value':
        if (!newVal) {
          this._image.removeAttribute('src')
        } else {
          this._image.src = newVal
        }
        break
      case 'alt':
        if (!newVal) {
          this._image.alt = ''
        } else {
          this._image.alt = newVal
        }
        break
      case 'disabled':
        if (newVal === '' || newVal === 'disabled') {
          this._selectButton.disabled = true
          this._clearButton.disabled = true
        } else {
          this._selectButton.removeAttribute('disabled')
          this._clearButton.removeAttribute('disabled')
        }
        break
      case 'selectlabel':
        if (!newVal) {
          this._selectButton.innerText = DEFAULT_SELECT_IMAGE_LABEL
        } else {
          this._selectButton.innerText = newVal
        }
        break
      case 'clearlabel':
        if (!newVal) {
          this._clearButton.innerText = DEFAULT_SELECT_IMAGE_LABEL
        } else {
          this._clearButton.innerText = newVal
        }
        break
    }
  }
}

/** Select an image from the lokal systems storage.
  * @private
  * @param {module:sebastiansit/webcomponents/selectimage~SelectImage} selectImageElement The element to select a image for.
  * @returns {undefined}
  */
function selectImage (selectImageElement) {
  const fileInput = document.createElement('input')
  fileInput.setAttribute('type', 'file')
  fileInput.setAttribute('accept', 'image/*')
  fileInput.addEventListener('change', function (event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader()
      reader.onload = function (event) {
        selectImageElement.value = event.target.result
      }
      reader.readAsDataURL(event.target.files[0])
    }
  })
  fileInput.click()
}

/** Remove the selected image and reset to the inital image if one is available.
  * The inital value is accessable with the defaultValue property.
  * @private
  * @param {module:sebastiansit/webcomponents/selectimage~SelectImage} selectImageElement The element to reset.
  * @returns {undefined}
  */
function removeImage (selectImageElement) {
  selectImageElement.value = selectImageElement.defaultValue
}

/**
  * @private
  * @static
  * @param {module:sebastiansit/webcomponents/selectimage~SelectImage} selectImageElement
  * @returns {undefined}
  */
function initSelectImageElement (selectImageElement) {
  const selectButton = selectImageElement._selectButton
  const clearButton = selectImageElement._clearButton

  selectButton.addEventListener('click', (event) => {
    event.stopPropagation()
    event.preventDefault()

    selectImage(selectImageElement)
    clearButton.disabled = false
  })

  clearButton.addEventListener('click', (event) => {
    event.stopPropagation()
    event.preventDefault()

    removeImage(selectImageElement)
    event.target.disabled = true
  })
}

window.customElements.define('sit-select-image', SelectImage)
