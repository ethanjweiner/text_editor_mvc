# Text Editor

## REQUIREMENTS

- By clicking on buttons, users can:
  - Bold text
  - Italicize test
  - Underline text
  - Strike-through text
  - Turn text into a link
  - Create an unordered list
  - Create an ordered list
  - Align text
- Use `contenteditable` to allow for the element (and its descendants) to be editable
- Buttons should highlight to reflect current editing state

## ARCHITECTURE

Only break up into MVC ic necessary

### Model

- Currently active editing state?
- `execCommand` executes -> button should highlight

### View

- Buttons
  - Currently active editing state -> active buttons
- Events:
  - A button is clicked -> `execCommand` should execute
  - Certainly formatted text is text is focused/unfocused/selected/unselected:
    - Button is activated/unactivated accordingly

## IMPLEMENTATION NOTES

- To create a link, simply add an `a` tag to the editable area
- To create ordered/unordered lists, simply add `ul` or `ol` tags to editable area
- To align text, just the `text-align` property?
- `Document.execCommand`: `commandName`, `showDefaultUI`, `value`
  - Notable `commandName`s: `bold` (toggles), `createLink`, `insertOrderedList`, `insertUnorderedList`, `italic` (toggles), `justify*`, `strikeThrough` (toggles), `undlerline` (toggles), `unlink?`
  - `showDefaultUI`
  - `value`: Specify `null` for all except `createLink`
  - Utilize the default behavior of `execCommand`:
    - Some affect selection
    - Some insert new elements
    - Some affect a line
    - Some affect the currently active element (e.g. `bold` command => editing is now set to bold)
    - some affect a combination