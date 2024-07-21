# Contributing
Thanks to everyone who offeres to contribute to AutoMod Regex Generator, contributors help make the tool as useful as possible for everyone. Here are some tips to help for contributing:

## Adding a new regex to `regexes.html`
When creating a new regex, first you will need to create a HTML div for the regex in `regexes.html`. An example div looks like this:
```html
<div class="spam-type" id="links">
  <a class="spam-name">All Links</a>
  <div class="grid-row">
    <p>Blocks all links. You should use this with allow keywords.</p>
    <div class="setting">
      <div class="title-with-setting">
        <!-- setting ids MUST be unique between all regexes -->
        <input type="checkbox" id="include-nonclickable" checked>
        Include Non-Clickable Links
      </div>
      <p>When enabled, this will block links without the <code>https://</code> but <a class="warning-description">this can cause some false negatives.</a></p>
    </div> <!-- If the regex doesn't have any settings, delete between <div class="setting"> and here -->

    <!-- below this line, only the last part of the ids SHOULD be changed (e.g. "copy-regex-links" and "regex-output-links") -->
    <div class="regex-results">
      <button class="copy-regex" id="copy-regex-links">Copy</button>
      <a class="regex-output" id="regex-output-links">h[e3]ll[o0] w[o0]rld</a>
    </div>
  </div>
</div>
```
You will need to change the text and give a proper title, description and setting information. Additionally, each ID needs to be changed but only the part which says links SHOULD be changed:
- `links`
- `copy-regex-links`
- `regex-output-links`
- all setting input elements MUST have a unique id.

The div above should be placed as a direct child of the div with ID `spam-grid` in `regexes.html`. Then, configuration must be created in `static/regexes.js` the following Object should be placed in the list `regex_types`:

```js
{
  name: "links",
  copy_btn: document.getElementById("copy-regex-links"),
  output: document.getElementById("regex-output-links"),
  generator: function(settings) {
    if (settings.nonclick.checked) {
      return `(?:https?://)?[a-z0-9_\\-\\.]*[a-z0-9_\\-]+\\.[a-z]{2,}`;
    } else {
      return `(?:https?://)[a-z0-9_\\-\\.]*[a-z0-9_\\-]+\\.[a-z]{2,}`;
    };
  },
  setting_elements: {
    nonclick: document.getElementById("include-nonclickable")
  }
}
```

`name` should be equal to the `id` provided to the parent div in the previous step. and `copy_btn` and `output` should be the element from the div in the previous step. The `generator` function should contain the logic to generate your regex and return the regex as a string. Note that forward slashes (`\`) need to be escaped as `\\`. Elements provided in `settings_elements` is simply passed to the generator as the `settings` argument.

Test that the regex is functional before opening a pull request.

## Modifying a regex

**Modifying the text (name, description, etc) of a regex**: The modification can be made in the html in `regexes.html`, please consider the instruction in the previous instructions.
**Modifying the regex output**: Find the regex in `static/regexes.html` and modify the generator function. The `generator` function should contain the logic to generate the regex and return the regex as a string. Note that forward slashes (`\`) need to be escaped as `\\`. Elements provided in `settings_elements` is simply passed to the generator as the `settings` argument.
**Adding new settings**: Consider the previous instructions on creating a new regex
