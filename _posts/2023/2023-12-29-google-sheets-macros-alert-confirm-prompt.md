---
layout: post
title: 'Google Sheets Macros: alert, confirm, prompt'
date: 2023-12-29 21:22:30
excerpt: How to use alert, confirm, and prompt with Google Sheets Macros.
categories: google sheets macros alert confirm prompt javascript
---

This post goes over how to use alert, confirm, and prompt with [Google Sheets Macros](https://developers.google.com/apps-script/guides/sheets/macros).

- [Alert](#alert)
- [Confirm](#confirm)
- [Prompt](#prompt)

## Alert

Open a dialog box with an `OK` button:

```js
SpreadsheetApp.getUi().alert('Message');
```

See the [documentation](https://developers.google.com/apps-script/reference/base/ui#alertprompt).

## Confirm

Open a dialog box with `Yes` and `No` buttons:

```js
const ui = SpreadsheetApp.getUi();
const response = ui.alert('Title', 'Message', ui.ButtonSet.YES_NO);

switch (response) {
  case ui.Button.YES:
    console.log('Yes');
    break;
  case ui.Button.NO:
    console.log('No');
    break;
  default:
    console.log('Clicked outside');
    break;
}

SpreadsheetApp.getActive().toast(response);
```

See the [documentation](https://developers.google.com/apps-script/reference/base/ui#alerttitle,-prompt,-buttons).

## Prompt

Open an input dialog box with an `OK` button:

```js
const ui = SpreadsheetApp.getUi();
const response = ui.prompt('Input:');

if (response.getSelectedButton() === ui.Button.OK) {
  const text = response.getResponseText();
  console.log(text);
  SpreadsheetApp.getActive().toast(text);
}
```

Open an input dialog box with `Yes`, `No`, and `Cancel` buttons:

```js
const ui = SpreadsheetApp.getUi();
const response = ui.prompt('Input:');
const text = response.getResponseText();

switch (response.getSelectedButton()) {
  case ui.Button.YES:
    console.log('Yes', text);
    break;
  case ui.Button.NO:
    console.log('No', text);
    break;
  case ui.Button.CANCEL:
    console.log('Cancel', text);
    break;
  default:
    console.log('Clicked outside', text);
    break;
}

SpreadsheetApp.getActive().toast(text);
```

See the [documentation](https://developers.google.com/apps-script/reference/base/ui#promptprompt).

Alternatively, there's the deprecated [`Browser.inputBox`](<https://developers.google.com/apps-script/reference/base/browser#inputBox(String)>) and [`Browser.msgBox`](<https://developers.google.com/apps-script/reference/base/browser#msgBox(String)>), which are no longer recommended.
