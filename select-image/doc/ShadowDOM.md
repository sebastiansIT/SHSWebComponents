# Shadow DOM of select-image
This is the description for the shadow DOM of the web component
[select-image](../README.md).

## DOM Structure
The shadow DOM contains an image and two buttons. The buttons are grouped by
an span with the class **imagecontrols** element.

  <img alt="" />
  <span id="imagecontrols" part="sit-select-image-toolbar">
    <button id="selectImage" type="button"
      part="sit-select-image-select-button">${DEFAULT_SELECT_IMAGE_LABEL}</button>
    <button id="clearImage" type="button" disabled="disabled"
      part="sit-select-image-reset-button">${DEFAULT_CLEAR_IMAGE_LABEL}</button>
  </span>

## Styling
To style the shadow DOM I support two technics.

### Custom properties

Custom properties can pierce the shadow DOM boundaries. But there is a problem:
If you set a custom property as a value to a regular propery and the custom
property isn't set the regualar property is unset. In such a case the default
style is broken. To solve this the keyword **revert** is used. But **revert**
isn't supported in the most browsers (only Firefox at the moment).

The following CSS custom properties are declared:

<dl>
  <dt>--sit-button-width</dt>
  <dd><p>The width of the buttons inside the custom element.</p></dd>

  <dt>--sit-button-background</dt>
  <dd><p>The background of the buttons inside the custom element.</p></dd>

  <dt>--sit-button-margin</dt>
  <dd><p>The margin of the buttons inside the custom element.</p></dd>

  <dt>--sit-button-border</dt>
  <dd><p>The border of the buttons inside the custom element.</p></dd>

  <dt>--sit-button-radius</dt>
  <dd><p>The border-radius of the buttons inside the custom element.</p></dd>

  <dt>--sit-button-padding</dt>
  <dd><p>The padding of the buttons inside the custom element.</p></dd>

  <dt>--sit-button-font</dt>
  <dd><p>the font of the buttons inside the custom element.</p></dd>

  <dt>--sit-button-hover-border</dt>
  <dd><p>The border of the buttons when they are hovered.</p></dd>

  <dt>--sit-button-hover-decoration</dt>
  <dd><p>The text-decoration of the buttons when they are hovered.</p></dd>

  <dt>--sit-button-focus-border</dt>
  <dd><p>The border of the buttons when they are focused.</p></dd>

  <dt>--sit-button-focus-decoration</dt>
  <dd><p>The text-decoration of the buttons when tey are focused.</p></dd>

  <dt>--sit-button-active-background</dt>
  <dd><p>The background of the buttons when they are active.</p></dd>

  <dt>--sit-button-active-border</dt>
  <dd><p>The border of the buttons when they are active.</p></dd>
</dl>

### Parts

You can declare some elements in the shadow DOM as parts. With the pseudo
element selector *::part()* you can address such elements and style them.

The declared parts are&hellip;

<dt>
  <dt>sit-select-image-toolbar</dt>
  <dd><p>The HTMLSpanElement acts as the container for the buttons.</p></dd>

  <dt>sit-select-image-select-button</dt>
  <dd><p>The HTMLButtonElement to select a new image.</p></dd>

  <dt>sit-select-image-reset-button</dt>
  <dd><p>The HTMLButtonElement to reset the selected image.</p></dd>
</dt>
