---
layout: post
title: Phonetic Alphabet Converter
date: 2020-02-09 16:46:30
excerpt: Phonetic Alphabet Converter parses a string into NATO phonetic alphabet words.
categories: npm package site nato phonetic alphabet converter
---

[Phonetic Alphabet Converter](https://remarkablemark.org/phonetic-alphabet-converter/) parses a string into a list of [NATO phonetic alphabet](https://en.wikipedia.org/wiki/NATO_phonetic_alphabet) words.

<iframe src="https://remarkablemark.org/phonetic-alphabet-converter/" frameBorder="0" width="100%" height="275px"></iframe>

You can download `phonetic-alphabet-converter` from:

- [npm](https://www.npmjs.com/package/phonetic-alphabet-converter)
- [yarn](https://yarnpkg.com/package/phonetic-alphabet-converter)
- [unpkg](https://unpkg.com/phonetic-alphabet-converter/)

The reason I published another phonetic alphabet package was because I couldn't find one that builds to [UMD](https://github.com/umdjs/umd).

Since my end goal was to build a website, I wanted to load the library over a CDN instead of having to set up a build system.

While designing the [UI](https://en.wikipedia.org/wiki/User_interface), I used [Material Components for the web (MDC Web)](https://github.com/material-components/material-components-web) as the design system.

I wrote the package in [TypeScript](https://www.typescriptlang.org/) and found it easy to use after the initial set up. The type checking was also very helpful.

However, one downside was that the TypeScript compiler doesn't support building to UMD with a global variable (see [issue](https://github.com/microsoft/TypeScript/issues/8436)). Thus, I had to bundle with [rollup](https://rollupjs.org/) as well. (For more details, check out [how to build to UMD with rollup]({% post_url 2019/2019-07-12-rollup-commonjs-umd %}).)

You can find the repository on [GitHub](https://github.com/remarkablemark/phonetic-alphabet-converter).
