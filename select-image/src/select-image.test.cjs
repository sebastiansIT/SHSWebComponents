require('./select-image.js')

beforeAll(() => {
    // attachInternals() isn't available in JSDOM so I need to simulate it
    if (!HTMLElement.prototype.attachInternals) {
        HTMLElement.prototype.attachInternals = () => {
            return {
                formValue: '',
                validity: {},
                setFormValue: (value) => {
                    this.formValue = value
                },
                setValidity: (value) => {
                    this.validity = value
                }
            }
        }
    }
})

describe('Select Image Element', () => {
    describe('Init Element', () => {
        test('Element creation', () => {
            const element = document.createElement('sit-select-image')
            expect(element).toBeDefined();
        });

        test('Value after creation', () => {
            const element = document.createElement('sit-select-image')
            expect(element.value).toBeNull()
        })
    })

    describe('HTML-Attributes', () => {
        describe('Value Attribute', () => {
            test('setting value attribute should correspondent with value property', () => {
                const url = 'http://test.url/path/image.webp'
                const element = document.createElement('sit-select-image')
                element.setAttribute('value', url)

                expect(element.value).toBe(url)
                expect(element.getAttribute('value')).toBe(url)
            })

            test('should disable reset button if initialised with a value', () => {
                const url = 'http://test.url/path/image.webp'
                const element = document.createElement('sit-select-image')
                element.setAttribute('value', url)
                document.body.appendChild(element)

                expect(element.shadowRoot.querySelector('#clearImage').hasAttribute('disabled')).toBe(true)
            })
        })

        describe('Alt(ernativ) Attribute', () => {
            test('setting alt attribute should add an alternative text to img element in the shadow root', () => {
                const alt = 'Alternative text for the image'
                const element = document.createElement('sit-select-image')
                element.setAttribute('alt', alt)

                expect(element.shadowRoot.querySelector('img').alt).toBe(alt)
                expect(element.getAttribute('alt')).toBe(alt)
            })

            test('setting alt attribute to empty string should set this as alternate text of the img element', () => {
                const alt = 'Alternative text for the image'
                const element = document.createElement('sit-select-image')
                element.setAttribute('alt', '')
                expect(element.shadowRoot.querySelector('img').alt).toBe('')
            })

            test('don\'t setting alt attribute should set empty string as alternate text of the img element', () => {
                const alt = 'Alternative text for the image'
                const element = document.createElement('sit-select-image')
                expect(element.shadowRoot.querySelector('img').alt).toBe('')
            })
        })

        describe('Disabled Attribute', () => {
            test('don\'t setting disables attribute should enables select button in shadow DOM', () => {
                const element = document.createElement('sit-select-image')
                expect(element.shadowRoot.querySelector('#selectImage').hasAttribute('disabled')).toBe(false)
                expect(element.shadowRoot.querySelector('#clearImage').hasAttribute('disabled')).toBe(true)
            })

            test('setting disables as boolean attribute should disables buttons in shadow DOM', () => {
                const element = document.createElement('sit-select-image')
                element.setAttribute('disabled', '')
                expect(element.shadowRoot.querySelector('#selectImage').disabled).toBe(true)
                expect(element.shadowRoot.querySelector('#clearImage').disabled).toBe(true)

                element.setAttribute('disabled', 'disabled')
                expect(element.shadowRoot.querySelector('#selectImage').disabled).toBe(true)
                expect(element.shadowRoot.querySelector('#clearImage').disabled).toBe(true)
            })
        })

        describe('Different labels', () => {
            test.each([
                ['selectlabel', 'selectImage'], 
                ['clearlabel', 'clearImage']]
            )('setting a label via attribute %s should change the button\'s %s text', (attribute, button) => {
                
                const label = 'A Label'
                const element = document.createElement('sit-select-image')
                element.setAttribute(attribute, label)

                expect(element.shadowRoot.querySelector(`#${button}`).innerText).toBe(label)
            })
        })
    })

    describe('Custom Element API', () => {
        describe('connectedCallback()', () => {
            test('should set given Value as default value on connecting the element to the DOM', () => {
                const url = 'http://test.url/path/image.webp'
                const element = document.createElement('sit-select-image')
                element.setAttribute('value', url)
                document.body.appendChild(element)

                expect(element.defaultValue).toBe(url)
            })

            test('should disable the reset button on connecting the element to the DOM', () => {
                const url = 'http://test.url/path/image.webp'
                const element = document.createElement('sit-select-image')
                element.setAttribute('value', url)
                document.body.appendChild(element)

                expect(element.shadowRoot.querySelector('#clearImage').disabled).toBe(true)
            })
        })
    })
})