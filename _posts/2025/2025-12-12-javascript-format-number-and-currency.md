---
layout: post
title: JavaScript format number and currency
date: 2025-12-12 16:27:10
excerpt: How to format number and currency with JavaScript.
categories: react hook timeout
---

This post goes over how to format number and currency with JavaScript.

## Format number

Format number with at most 1 decimal place:

```js
/**
 * Formats a number using compact notation with at most one decimal place (e.g., 1.2M or 123K).
 *
 * @param amount - The number to format.
 * @returns The formatted number as a string.
 */
function formatNumber(amount) {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount);
}
```

For example:

```js
formatNumber(1.23); // '1.2'
formatNumber(1234); // '1.2K'
formatNumber(1234567); // '1.2M'
```

## Format currency

Format USD currency with no decimal places:

```js
/**
 * Formats a dollar currency with no decimal places (e.g., $123).
 *
 * @param amount - The number to format.
 * @returns The formatted number as a string.
 */
function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
```

For example:

```js
formatCurrency(1.2); // '$1'
formatCurrency(1234); // '$1,234'
```
