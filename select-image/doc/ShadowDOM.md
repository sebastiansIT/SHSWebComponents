# Shadow DOM of select-image
This is the description for the shadow DOM of the web component
[select-image](../README.md).

## DOM Structure
The shadow DOM contains an image and two buttons. The buttons are grouped by
an span element with the class **imagecontrols**.

    <img alt="" />
    <span id="imagecontrols" part="sit-select-image-toolbar">
      <button id="selectImage" type="button"
        part="sit-select-image-select-button">${DEFAULT_SELECT_IMAGE_LABEL}</button>
      <button id="clearImage" type="button" disabled="disabled"
        part="sit-select-image-reset-button">${DEFAULT_CLEAR_IMAGE_LABEL}</button>
    </span>

## Styling
The pseudo element *::part()* can be used to design the shadow DOM.
Since version 1.1 the alternative styling with custom properties isn't longer 
supported.

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

There is an example for this on the [demo page](../demo.html#demo6_section).
