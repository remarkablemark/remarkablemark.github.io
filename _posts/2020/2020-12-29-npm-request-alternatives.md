---
layout: post
title: npm request alternatives
date: 2020-12-29 21:22:01
updated: 2020-12-29 21:25:00
excerpt: A list of alternative libraries to use to replace npm package `request`.
categories: npm request
---

Since [`request`](https://www.npmjs.com/package/request) is deprecated, I wanted a list of alternative libraries to compare against. The results of issue [#3143](https://github.com/request/request/issues/3143) are captured in the following table:

| Package Name                   | GitHub Stars       | Bundle Size       | Weekly Downloads       |
| ------------------------------ | ------------------ | ----------------- | ---------------------- |
| [![node-fetch][0a]][0b]        | [![stars][0c]][0d] | [![size][0e]][0f] | [![downloads][0g]][0b] |
| [![bent][1a]][1b]              | [![stars][1c]][1d] | [![size][1e]][1f] | [![downloads][1g]][1b] |
| [![got][2a]][2b]               | [![stars][2c]][2d] | [![size][2e]][2f] | [![downloads][2g]][2b] |
| [![make-fetch-happen][3a]][3b] | [![stars][3c]][3d] | [![size][3e]][3f] | [![downloads][3g]][3b] |
| [![axios][4a]][4b]             | [![stars][4c]][4d] | [![size][4e]][4f] | [![downloads][4g]][4b] |
| [![unfetch][5a]][5b]           | [![stars][5c]][5d] | [![size][5e]][5f] | [![downloads][5g]][5b] |
| [![superagent][6a]][6b]        | [![stars][6c]][6d] | [![size][6e]][6f] | [![downloads][6g]][6b] |
| [![tiny-json-http][7a]][7b]    | [![stars][7c]][7d] | [![size][7e]][7f] | [![downloads][7g]][7b] |
| [![needle][8a]][8b]            | [![stars][8c]][8d] | [![size][8e]][8f] | [![downloads][8g]][8b] |
| [![urllib][9a]][9b]            | [![stars][9c]][9d] | [![size][9e]][9f] | [![downloads][9g]][9b] |

The badges are generated by [NodeICO](https://nodei.co/) and [Shields.io](https://shields.io/). For a more detailed comparison, check out [npm trends](https://www.npmtrends.com/).

<!-- node-fetch -->

[0a]: https://nodei.co/npm/node-fetch.png
[0b]: https://www.npmjs.com/package/node-fetch
[0c]: https://img.shields.io/github/stars/bitinn/node-fetch?style=social
[0d]: https://github.com/node-fetch/node-fetch
[0e]: https://img.shields.io/bundlephobia/min/node-fetch
[0f]: https://bundlephobia.com/result?p=node-fetch
[0g]: https://img.shields.io/npm/dw/node-fetch

<!-- bent -->

[1a]: https://nodei.co/npm/bent.png
[1b]: https://www.npmjs.com/package/bent
[1c]: https://img.shields.io/github/stars/mikeal/bent?style=social
[1d]: https://github.com/mikeal/bent
[1e]: https://img.shields.io/bundlephobia/min/bent
[1f]: https://bundlephobia.com/result?p=bent
[1g]: https://img.shields.io/npm/dw/bent

<!-- got -->

[2a]: https://nodei.co/npm/got.png
[2b]: https://www.npmjs.com/package/got
[2c]: https://img.shields.io/github/stars/sindresorhus/got?style=social
[2d]: https://github.com/sindresorhus/got
[2e]: https://img.shields.io/bundlephobia/min/got
[2f]: https://bundlephobia.com/result?p=got
[2g]: https://img.shields.io/npm/dw/got

<!-- make-fetch-happen -->

[3a]: https://nodei.co/npm/make-fetch-happen.png
[3b]: https://www.npmjs.com/package/make-fetch-happen
[3c]: https://img.shields.io/github/stars/npm/make-fetch-happen?style=social
[3d]: https://github.com/npm/make-fetch-happen
[3e]: https://img.shields.io/bundlephobia/min/make-fetch-happen
[3f]: https://bundlephobia.com/result?p=make-fetch-happen
[3g]: https://img.shields.io/npm/dw/make-fetch-happen

<!-- axios -->

[4a]: https://nodei.co/npm/axios.png
[4b]: https://www.npmjs.com/package/axios
[4c]: https://img.shields.io/github/stars/axios/axios?style=social
[4d]: https://github.com/axios/axios
[4e]: https://img.shields.io/bundlephobia/min/axios
[4f]: https://bundlephobia.com/result?p=axios
[4g]: https://img.shields.io/npm/dw/axios

<!-- unfetch -->

[5a]: https://nodei.co/npm/unfetch.png
[5b]: https://www.npmjs.com/package/unfetch
[5c]: https://img.shields.io/github/stars/developit/unfetch?style=social
[5d]: https://github.com/developit/unfetch
[5e]: https://img.shields.io/bundlephobia/min/unfetch
[5f]: https://bundlephobia.com/result?p=unfetch
[5g]: https://img.shields.io/npm/dw/unfetch

<!-- superagent -->

[6a]: https://nodei.co/npm/superagent.png
[6b]: https://www.npmjs.com/package/superagent
[6c]: https://img.shields.io/github/stars/visionmedia/superagent?style=social
[6d]: https://github.com/visionmedia/superagent
[6e]: https://img.shields.io/bundlephobia/min/superagent
[6f]: https://bundlephobia.com/result?p=superagent
[6g]: https://img.shields.io/npm/dw/superagent

<!-- tiny-json-http -->

[7a]: https://nodei.co/npm/tiny-json-http.png
[7b]: https://www.npmjs.com/package/tiny-json-http
[7c]: https://img.shields.io/github/stars/brianleroux/tiny-json-http?style=social
[7d]: https://github.com/brianleroux/tiny-json-http
[7e]: https://img.shields.io/bundlephobia/min/tiny-json-http
[7f]: https://bundlephobia.com/result?p=tiny-json-http
[7g]: https://img.shields.io/npm/dw/tiny-json-http

<!-- needle -->

[8a]: https://nodei.co/npm/needle.png
[8b]: https://www.npmjs.com/package/needle
[8c]: https://img.shields.io/github/stars/tomas/needle?style=social
[8d]: https://github.com/tomas/needle
[8e]: https://img.shields.io/bundlephobia/min/needle
[8f]: https://bundlephobia.com/result?p=needle
[8g]: https://img.shields.io/npm/dw/needle

<!-- urllib -->

[9a]: https://nodei.co/npm/urllib.png
[9b]: https://www.npmjs.com/package/urllib
[9c]: https://img.shields.io/github/stars/node-modules/urllib?style=social
[9d]: https://github.com/node-modules/urllib
[9e]: https://img.shields.io/bundlephobia/min/urllib
[9f]: https://bundlephobia.com/result?p=urllib
[9g]: https://img.shields.io/npm/dw/urllib
