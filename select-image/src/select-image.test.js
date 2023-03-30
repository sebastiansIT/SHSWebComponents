//import * as selectImage from 'select-image'
require('./select-image.js')

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
        })

        describe('Alt(ernativ) Attribute', () => {
            test('setting alt attribute should add an alternative text to img element in the shadow root', () => {
                const alt = 'Alternative text for the image'
                const element = document.createElement('sit-select-image')
                element.setAttribute('alt', alt)

                expect(element._shadowRoot.querySelector('img').alt).toBe(alt)
                expect(element.getAttribute('alt')).toBe(alt)
            })

            test('setting alt attribute to empty string should set this as alternate text of the img element', () => {
                const alt = 'Alternative text for the image'
                const element = document.createElement('sit-select-image')
                element.setAttribute('alt', '')
                expect(element._shadowRoot.querySelector('img').alt).toBe('')
            })

            test('don\'t setting alt attribute should set empty string as alternate text of the img element', () => {
                const alt = 'Alternative text for the image'
                const element = document.createElement('sit-select-image')
                expect(element._shadowRoot.querySelector('img').alt).toBe('')
            })
        })

        describe('Disabled Attribute', () => {
            // TODO clear Button should only be enabled if value is changed by user
            test('don\'t setting disables attribute should enables buttons in shadow DOM', () => {
                const element = document.createElement('sit-select-image')
                expect(element._shadowRoot.querySelector('#selectImage').hasAttribute('disabled')).toBe(false)
                expect(element._shadowRoot.querySelector('#clearImage').hasAttribute('disabled')).toBe(false)
            })

            test('setting disables as boolean attribute should disables buttons in shadow DOM', () => {
                const element = document.createElement('sit-select-image')
                element.setAttribute('disabled', '')
                expect(element._shadowRoot.querySelector('#selectImage').disabled).toBe(true)
                expect(element._shadowRoot.querySelector('#clearImage').disabled).toBe(true)

                element.setAttribute('disabled', 'disabled')
                expect(element._shadowRoot.querySelector('#selectImage').disabled).toBe(true)
                expect(element._shadowRoot.querySelector('#clearImage').disabled).toBe(true)
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

                expect(element._shadowRoot.querySelector(`#${button}`).innerText).toBe(label)
            })
        })
    })
})