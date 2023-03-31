---
layout: post
title: Confirm before form submit
date: 2023-03-31 19:44:25
excerpt: How to confirm before form submit using HTML and JavaScript.
categories: html javascript form
---

This post goes over how to confirm before form submit:

- [Single Form](#single-form)
- [Multiple Forms](#multiple-forms)

## Single Form

Given an HTML [form](https://developer.mozilla.org/docs/Web/HTML/Element/form) with a submit [button](https://developer.mozilla.org/docs/Web/HTML/Element/button):

```html
<!-- form.html -->
<form action="#">
  <button type="submit">Submit</button>
</form>
```

You can [confirm](https://developer.mozilla.org/docs/Web/API/Window/confirm) before submitting the form using JavaScript:

```html
<script>
  const form = document.querySelector('form');
  const button = form.querySelector('button[type="submit"]');

  button.addEventListener('click', (event) => {
    event.preventDefault();

    if (confirm('Are you sure you want to submit?')) {
      form.submit();
    }
  });
</script>
```

## Multiple Forms

For multiple forms, use [`document.querySelectorAll`](https://developer.mozilla.org/docs/Web/API/Document/querySelectorAll):

```html
<script>
  const forms = document.querySelectorAll('form');

  forms.forEach((form) => {
    const button = form.querySelector('button[type="submit"]');

    button.addEventListener('click', (event) => {
      event.preventDefault();

      if (confirm('Are you sure you want to submit?')) {
        form.submit();
      }
    });
  });
</script>
```

## Demo

[Replit](https://replit.com/@remarkablemark/Confirm-before-form-submit#index.html):

<iframe height="500px" width="100%" src="https://replit.com/@remarkablemark/Confirm-before-form-submit?lite=true#index.html" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
