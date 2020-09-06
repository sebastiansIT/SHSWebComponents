# SebastiansIT select-image element
This web component is part of my personal collection [SITWebComponents](../README.md).

It allows you to select a image file from your local storage. The selected image is shown and can be craped as a data URL via Javascript.

## Examples
You can see some examples as part of the [demo page](./demo.html).

## Documentation

1. [&lt;sit-select-image&gt;](./doc/CustomElement.md)
1. [SelectImageElement](./doc/JSAPI.md)
1. [ShadowDOM](./doc/ShadowDOM.md)

## Prerequisite
To use this element the user agent must have support for&hellip;

- [ECMAScript 2015 const Keyword](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const)
- [ECMAScript 2015 Class Syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
- [ECMAScript 2015 Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [HTML Custom Elements](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry)
- [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow)
- [HTML5 Template Element](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)
- [ECMAScript 2015 Template Literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)

The most features listet here can transpiled to older javascript features or
can be simulated with polyfills. But this is a Job for you.

To style the shadow DOM support for addidional features is needed:

- [CSS Cascading and Inheritance Level 4 revert keyword](https://developer.mozilla.org/en-US/docs/Web/CSS/revert#Specifications)
- [CSS Shadow Parts](https://developer.mozilla.org/en-US/docs/Web/CSS/::part)

For more information about styling see my [documentation](./doc/ShadowDOM.md).

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
