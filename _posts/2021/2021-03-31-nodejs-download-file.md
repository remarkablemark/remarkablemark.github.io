---
layout: post
title: How to download a file using Node.js
date: 2021-03-31 19:52:23
excerpt: How to download an MP4 file using Node.js and npm library `node-fetch`.
categories: nodejs fetch javascript npm download
---

To download a file using Node.js, use one of the the many [npm request libraries]({% post_url 2020/2020-12-29-npm-request-alternatives %}).

## Example

For example, an MP4 file can be downloaded using [node-fetch](https://github.com/node-fetch/node-fetch).

Install [node-fetch](https://www.npmjs.com/package/node-fetch):

```sh
npm install node-fetch
```

The URL of the MP4 file is:

```
https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4
```

Create a JavaScript file `index.js` that downloads the MP4:

```js
// index.js
const fetch = require('node-fetch');
const { writeFile } = require('fs').promises;

const url =
  'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/360/Big_Buck_Bunny_360_10s_1MB.mp4';

(async () => {
  const response = await fetch(url);
  const buffer = await response.buffer();
  await writeFile('test.mp4', buffer);
  console.log('Done!');
})();
```

Run the script to download the MP4:

```sh
node index.js
```

## Demo

[Replit](https://replit.com/@remarkablemark/node-fetch-mp4#index.js):

<iframe height="400px" width="100%" src="https://replit.com/@remarkablemark/node-fetch-mp4?lite=true#index.js" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
