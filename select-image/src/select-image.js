/*  Copyright 2019 Sebastian Spautz

    This File is Part of "SITWebComponents"
    <https://github.com/sebastiansIT/SHSWebComponents>.

    SHSWebComponents is free software: you can redistribute it and/or modify
    it under the terms of the Lesser GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    SHSWebComponents is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    Lesser GNU General Public License for more details.

    You should have received a copy of the Lesser GNU General Public License
    along with SHSWebComponents. If not, see <http://www.gnu.org/licenses/>.
*/

/* globals HTMLElement FileReader */

const DEFAULT_SELECT_IMAGE_LABEL = 'Select'
const DEFAULT_CLEAR_IMAGE_LABEL = 'Clear'
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
      min-width: inherit;
      width: inherit;
      max-width: inherit;
      min-height: inherit;
      height: inherit;
      max-height: inherit;
    }

    #imagecontrols {
      position: absolute;
      bottom: 0;
      right: 0;
    }

    /* Selects ths controls inside the shadow root host, only if the host is readonly */
    :host([readonly]) #imagecontrols {
      display: none;
    }
  </style>
  <img src="" alt="" />
  <span id="imagecontrols">
    <button id="selectImage" type="button">${DEFAULT_SELECT_IMAGE_LABEL}</button>
    <button id="clearImage" type="button">${DEFAULT_CLEAR_IMAGE_LABEL}</button>
  </span>
`

class SelectImage extends HTMLElement {
  constructor () {
    super()

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

  /* getter and setter for title attribute are part of HTMLElement */

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

/**
  * @private
  * @static
  * @param {SelectImage} selectImageElement
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

/**
  * @private
  * @static
  * @param {SelectImage} selectImageElement
  * @returns {undefined}
  */
function removeImage (selectImageElement) {
  selectImageElement.value = null
}

/**
  * @private
  * @static
  * @param {SelectImage} selectImageElement
  * @returns {undefined}
  */
function initSelectImageElement (selectImageElement) {
  const selectButton = selectImageElement._selectButton
  const clearButton = selectImageElement._clearButton

  selectButton.addEventListener('click', (event) => {
    event.stopPropagation()
    event.preventDefault()

    selectImage(selectImageElement)
  })

  clearButton.addEventListener('click', (event) => {
    event.stopPropagation()
    event.preventDefault()

    removeImage(selectImageElement)
  })
}

window.customElements.define('sit-select-image', SelectImage)
