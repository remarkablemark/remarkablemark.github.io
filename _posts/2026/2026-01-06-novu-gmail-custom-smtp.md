---
layout: post
title: Novu Gmail Custom SMTP
date: 2026-01-06 14:42:27
excerpt: How to set up Novu notifications with Gmail as a custom SMTP provider.
categories: novu gmail smtp
---

This post goes over how to set up [Novu](https://novu.co/) notifications with [Gmail](https://gmail.com/) as a custom SMTP provider.

## Gmail

Generate an [App Password](https://myaccount.google.com/apppasswords). It should be 16 digits.

## Custom SMTP

Login to Novu and go to [Integration Store](https://dashboard.novu.co/integrations) > **Connect Provider** > **Custom SMTP**.

Fill the required inputs:

| Field              | Value                 |
| ------------------ | --------------------- |
| Name               | Gmail Custom SMTP     |
| Identifier         | gmail-custom-smtp     |
| User               | _[your email]_        |
| Password           | _[your app password]_ |
| Host               | smtp.gmail.com        |
| Port               | 465                   |
| Require TLS        | ✅                    |
| From email address | _[your email]_        |
| Sender name        | _[your name]_         |

Click **Save Changes**.

## Test

To test the provider, go to **Workflows** > find your workflow > **⋮** > **Trigger workflow**.
