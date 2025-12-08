---
layout: post
title: How to use html2pdf with React
date: 2025-12-08 17:20:18
excerpt: How to export HTML to PDF with html2pdf and React.
categories: html2pdf react
---

This post goes over how to export HTML to PDF with [html2pdf](https://ekoopmans.github.io/html2pdf.js/) and [React](https://react.dev/).

## Prerequisites

Given you have `html2pdf.js` installed:

```sh
npm install html2pdf.js
```

And a React app:

```tsx
export default function App() {
  return <div>{/* ... */}</div>;
}
```

## Ref

Add a [ref](https://react.dev/learn/referencing-values-with-refs) for the PDF export area:

```tsx
import { useRef } from 'react';

export default function App() {
  const exportAreaRef = useRef<HTMLDivElement>(null);
  return <div ref={exportAreaRef}>{/* ... */}</div>;
}
```

## html2pdf

Add a button that triggers the export via [onClick](https://react.dev/learn/responding-to-events):

```tsx
import { useRef } from 'react';

export default function App() {
  const exportAreaRef = useRef<HTMLDivElement>(null);
  return (
    <div ref={exportAreaRef}>
      {/* ... */}
      <button
        onClick={() => {
          if (exportAreaRef.current) {
            html2pdf().from(exportAreaRef.current).save();
          }
        }}
      >
        Export
      </button>
    </div>
  );
}
```

If you want to exclude an element from the PDF export, add the [data attribute](https://developer.mozilla.org/docs/Web/HTML/How_to/Use_data_attributes):

```html
data-html2canvas-ignore="true"
```

So to ignore the button:

```html
<button data-html2canvas-ignore="true">Export</button>
```

You can also set `html2pdf` [options](https://ekoopmans.github.io/html2pdf.js/#options):

```js
html2pdf()
  .set({
    filename: 'test.pdf',
  })
  .from(exportAreaRef.current)
  .save();
```

To export a PDF that matches the screen size:

```js
html2pdf()
  .set({
    html2canvas: {
      scale: 2,
      width: window.innerWidth,
      height: window.innerHeight,
    },
    jsPDF: {
      format: [window.innerWidth, window.innerHeight],
      orientation: 'landscape',
    },
  })
  .from(exportAreaRef.current)
  .save();
```

## Demo

[StackBlitz](https://stackblitz.com/edit/html2pdf?file=src%2FApp.tsx):

<iframe height="600px" width="100%" src="https://stackblitz.com/edit/html2pdf?embed=1&file=src%2FApp.tsx" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-downloads allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
