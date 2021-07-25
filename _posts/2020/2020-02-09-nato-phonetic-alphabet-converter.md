---
layout: post
title: Phonetic Alphabet Converter
date: 2020-02-09 16:46:30
updated: 2020-03-10 22:06:32
excerpt: Phonetic Alphabet Converter parses a string into NATO phonetic alphabet words.
categories: npm package site nato phonetic alphabet converter
---

[Phonetic Alphabet Converter](https://remarkablemark.org/phonetic-alphabet-converter/) parses a string into a list of [NATO phonetic alphabet](https://en.wikipedia.org/wiki/NATO_phonetic_alphabet) words.

<iframe src="https://remarkablemark.org/phonetic-alphabet-converter/" frameBorder="0" width="100%" height="300px"></iframe>

## Installation

You can download `phonetic-alphabet-converter` from:

[npm](https://www.npmjs.com/package/phonetic-alphabet-converter)

```sh
npm install phonetic-alphabet-converter
```

[yarn](https://yarnpkg.com/package/phonetic-alphabet-converter)

```sh
yarn add phonetic-alphabet-converter
```

[unpkg](https://unpkg.com/phonetic-alphabet-converter/)

```html
<script src="https://unpkg.com/phonetic-alphabet-converter@latest/umd/phonetic-alphabet-converter.js"></script>
<script>
  window.PhoneticAlphabetConverter.default(/* string */);
</script>
```

## Motivation

I decided to publish another phonetic alphabet package because I couldn't find one that builds to [UMD](https://github.com/umdjs/umd).

My end goal was to build a static site so I wanted to load the library over a CDN instead of setting up a complicated build system.

## Stack

The package is written in [TypeScript](https://www.typescriptlang.org/). The setup did take some time initially; but afterwards, I found it simple to use and enjoyed the type checking.

The downside of TypeScript was that it didn't support compiling to UMD with a global variable (see [issue](https://github.com/microsoft/TypeScript/issues/8436)).

As a result, I had to add [rollup](https://rollupjs.org/) to the build system. If you're interested in learning how to configure a UMD build with rollup, check out this [article]({% post_url 2019/2019-07-12-rollup-commonjs-umd %}).

Regarding the site, I used [Material Components for the Web](https://github.com/material-components/material-components-web) (MDC Web) as the design system. You can learn more by checking out its [component styleguide](https://material-components.github.io/material-components-web-catalog/).

## Code

You can check out the code on [GitHub](https://github.com/remarkablemark/phonetic-alphabet-converter). Pull requests are welcome.
