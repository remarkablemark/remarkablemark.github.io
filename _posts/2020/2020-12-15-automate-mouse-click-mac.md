---
layout: post
title: How to automate mouse click on Mac
date: 2020-12-15 21:16:23
excerpt: How to automate the mouse click event on macOS using Cliclick and AppleScript.
categories: mac script cliclick applescript automation
---

To automate the mouse click action on macOS, use [Cliclick](https://www.bluem.net/en/projects/cliclick/), a CLI for emulating mouse events, and [AppleScript](https://en.wikipedia.org/wiki/AppleScript).

## Cliclick

Install [`cliclick`](https://github.com/BlueM/cliclick) with [Homebrew](https://brew.sh/):

```sh
brew install cliclick
```

To click at the current mouse location:

```sh
cliclick c:.
```

This is the same as running with the full binary path:

```sh
/usr/local/bin/cliclick c:.
```

## AppleScript

Open [Script Editor](https://developer.apple.com/library/archive/documentation/LanguagesUtilities/Conceptual/MacAutomationScriptingGuide/GettoKnowScriptEditor.html) with [Spotlight](https://support.apple.com/HT204014) and paste the [AppleScript](https://developer.apple.com/library/archive/documentation/AppleScript/Conceptual/AppleScriptLangGuide/introduction/ASLR_intro.html) code:

```applescript
delay 15

repeat 10 times
    do shell script "/usr/local/bin/cliclick c:."
    delay 1
end repeat
```

> AppleScript requires the full binary path to run `cliclick`.

The script does the following:

1. Wait 15 seconds (line 1).
2. Click at the current mouse location (line 4).
3. Wait 1 second (line 5).
4. Repeat steps 2 to 3 nine more times (lines 3-6).

To run the script, press the play button or `⌘+R` (Command-R). To stop the script, press the stop button or `⌘+.` (Command-Period). See [keyboard shortcuts in Script Editor on Mac](https://support.apple.com/en-lk/guide/script-editor/scrptedshtcut/mac).
