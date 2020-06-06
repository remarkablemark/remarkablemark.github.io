---
layout: post
title: Web App Template
date: 2020-06-06 18:25:13
excerpt: Web app template is Create React App but with React removed.
categories: web app template cra gist
---

I created [`web-app-template`](https://github.com/remarkablemark/web-app-template) because I liked [Create React App](https://github.com/facebook/create-react-app) (CRA) but wanted to keep it framework agnostic.

<iframe src="https://remarkablemark.org/web-app-template/" frameBorder="0" width="100%" height="200px"></iframe>

The [initial version](https://github.com/remarkablemark/web-app-template/tree/create-react-app%401) was just the ejected form of CRA but with [React](https://github.com/facebook/react/)-related dependencies removed.

However, I found updating the template to match CRA to be painful.

As a result, I created [`@descriptive/web-scripts`](https://www.npmjs.com/package/@descriptive/web-scripts), which is similar to [`react-scripts`](https://www.npmjs.com/package/react-scripts), but React dependencies and configs are removed.

## Migration

If you're using an older version of `web-app-template`, you can migrate to the latest by running:

```sh
npx https://gist.github.com/remarkablemark/f3644d65665dc07a91d7f7202c5a66b6
```

### Gist

{% gist f3644d65665dc07a91d7f7202c5a66b6 %}
