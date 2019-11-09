# &lt;sit-select-image&gt; Custom HTML Element
The custom HTML element &lt;sit-select-image&gt; embeds an input element for images
into the document.

It is the HTML representation of the web component [select-image](../README.md).

## HTML Attributes
You can use the attributes "value", "alt", "disabled", "readonly"
"selectlabel" and "clearlabel".

<dl>
<dt>alt</dt>
<dd><p>A String used as an alternative text description of the image inside of
the element.</p></dd>

<dt>clearlabel</dt>
<dd><p>A String used as the label of the button to clear the selected image.</p></dd>

<dt>disabled</dt>
<dd><p>A Boolean attribute which, if present, indicates that the user should
not be able to interact with the input.</p>
<p>The buttons inside of the element are declared as disabled if you set
this attribute.</p></dd>

<dt>readonly</dt>
<dd><p>A Boolean attribute which, if present, indicates that the user should
not be able to edit the value of the input.</p>
<p>The buttons inside of the element are invisible if you set this
attribute.</p></dd>

<dt>selectlabel</dt>
<dd><p>A String used as the label of the button to select another image.</p></dd>

<dt>value</dt>
<dd><p>The URL of the image. If the User select a image this attribute is changed
to a data URL representing the selected image.</p></dd>
</dl>

## Styling width CSS
You can stlye this element as normal with CSS. Per default the element is a
inline flex container that shows it's flex items verticaly and horizontaly
centered.

In addition it has a value of relative for the property position.

The shadow DOM can styled in a limited way. Concrete information are on the
page [Shadow DOM](./SadowDOM.md).

## Javascript
This custom element is represented by the [SelectInputElement](./JSAPI.md) class
in the DOM. SelectInputElement inherits from HTMLElement and provide all methods
and events declared there.
