---
layout: post
title: How to build a Privnote clone
date: 2022-04-23 19:15:57
excerpt: How to build a Privnote clone using JavaScript.
categories: privnote express nodejs javascript web
---

This article goes over how to build a [Privnote](https://privnote.com/) clone. See [Replit](https://replit.com/@remarkablemark/Privnote) or [repository](https://b.remarkabl.org/37Dpsbu).

## Privnote

[Privnote](https://privnote.com/info/about) is a web service that allows you to send secret notes that self-destruct after being read.

In its [FAQ](https://privnote.com/info/faq), it says that it's both _private and secure_. For that to be true, the note needs to be encrypted before it's send to the server and saved to the database.

When you create a note, Privnote sends a POST request with the data and returns a link:

```
https://privnote.com/path#secret
```

The `path` is the database key or id of the encrypted note. The `secret` is the encryption key used on the client-side before the data is sent to the server.

The reason why the secret is on the [hash fragment](https://wikipedia.org/wiki/URI_fragment) is because fragment identifiers are not sent to the server. As a result, this prevents Privnote from reading or decrypting your note on the server.

## Clone

For my clone, I created a [Node.js](https://nodejs.org/) [Express](https://expressjs.com/) server. It renders a form where you can enter and submit text:

```html
<!-- index.html -->
<form method="post">
  <textarea
    name="note"
    placeholder="Write your note here..."
    required
  ></textarea>
  <input type="submit" value="Create note" />
</form>
```

Before the note is sent to the server, the text is encrypted using [crypto-js](https://github.com/brix/crypto-js#aes-encryption)'s [AES algorithm](https://cryptojs.gitbook.io/docs/#ciphers) with a [randomly generated secret]({% post_url 2022/2022-04-17-javascript-generate-random-string %}):

```js
// client.js
const textarea = document.querySelector('textarea');
const form = document.querySelector('form');

const ciphertext = window.CryptoJS.AES.encrypt(
  textarea.value,
  generateSecret()
);

textarea.value = ciphertext;
form.submit();
```

The encrypted note is saved to the database with an id generated by [nanoid](https://github.com/ai/nanoid):

```js
// server.js
server.post('/', (request, response, next) => {
  const noteId = nanoid();
  const encryptedNote = request.body.note;
  await db.set(noteId, encryptedNote);
  // ...
});
```

The note URL is returned and the hash fragment is appended on the client.

When the note link is opened, the encrypted note is retrieved, deleted, and returned from the server:

```js
// server.js
server.get('/:noteId', (request, response, next) => {
  const encryptedNote = await db.get(request.params.noteId);
  await db.delete(request.params.noteId);
  response.render('index.html', { encryptedNote });
});
```

Then on the client, the encrypted note is decrypted using the secret from the hash fragment:

```js
// client.js
const secret = window.location.hash.slice(1);
const bytes = window.CryptoJS.AES.decrypt(textarea.value, secret);
const decryptedNote = bytes.toString(window.CryptoJS.enc.Utf8);
textarea.value = decryptedNote;
```

## Demo

[Replit](https://replit.com/@remarkablemark/Privnote):

<iframe height="800px" width="100%" src="https://replit.com/@remarkablemark/Privnote?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
