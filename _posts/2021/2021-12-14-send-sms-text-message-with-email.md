---
layout: post
title: Send SMS text message with email
date: 2021-12-14 16:31:28
excerpt: How to send an SMS text message to a phone number using email.
categories: sms email
---

This post goes over how to send an SMS text message to a phone number using email.

## Cell Carrier

Lookup your [cell carrier](https://freecarrierlookup.com/):

{% gist 7af4b784f4782b2decc00f91e4b553e3 %}

## Send Email

Send an email to an address that combines the 10-digit phone number with the cell carrier domain:

```
number@carrier.domain
```

For example, given the phone number `1234567890` and cell carrier `Verizon`, the email address would be `1234567890@vtext.com`.

## Demo

[JSFiddle](https://jsfiddle.net/remarkablemark/ujqk6fsb/):

<script async src="//jsfiddle.net/remarkablemark/ujqk6fsb/embed/result,js,html/"></script>
