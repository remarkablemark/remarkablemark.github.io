---
layout: post
title: How to run Prettier on save for VS Code
date: 2024-10-08 18:21:42
excerpt: How to format with Prettier on save for Visual Studio Code.
categories: vscode prettier ide
---

Install [Visual Studio Code](https://code.visualstudio.com/) and the extension [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).

Press `Command` + `Shift` + `P` (or `Ctrl` + `Shift` + `P`) and open `settings.json`.

Add the following to `settings.json`:

```json
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
```
