---
layout: post
title: Web App Template
date: 2020-06-06 18:25:13
updated: 2020-06-28 20:15:51
excerpt: Web App Template is Create React App but without React.
categories: web app template cra npx
---

I created [`web-app-template`](https://github.com/remarkablemark/web-app-template) because I liked [Create React App](https://github.com/facebook/create-react-app) (CRA) but wanted to keep it framework agnostic.

<iframe src="https://remarkablemark.org/web-app-template/" frameBorder="0" width="100%" height="200px"></iframe>

The [initial version](https://github.com/remarkablemark/web-app-template/tree/create-react-app%401) was just the ejected form of CRA but with [React](https://github.com/facebook/react/)-related dependencies removed.

However, I found updating the template to match CRA to be painful.

As a result, I created [`@descriptive/web-scripts`](https://www.npmjs.com/package/@descriptive/web-scripts), which is similar to [`react-scripts`](https://www.npmjs.com/package/react-scripts), but React dependencies and configs are removed.

## Migration

If you're using an older version of `web-app-template` (one without `@descriptive/web-scripts`), you can migrate to use `@descriptive/web-scripts` by running:

```sh
npx web-scripts-migration
```

See [web-scripts-migration](https://www.npmjs.com/package/web-scripts-migration) for more information.
