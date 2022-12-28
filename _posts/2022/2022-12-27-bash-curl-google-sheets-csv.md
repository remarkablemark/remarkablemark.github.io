---
layout: post
title: Download Google Sheets CSV with cURL
date: 2022-12-27 20:47:55
excerpt: How to export and download Google Sheets spreadsheet as a CSV with Bash cURL.
categories: bash curl google sheets csv
---

This post goes over how to export and download Google Sheets spreadsheet as a CSV with [cURL](https://curl.se/).

## Prerequisites

Create a Google Sheets spreadsheet and change the **Share** access to **Anyone with the link**.

Copy the link, which should look something like:

```
https://docs.google.com/spreadsheets/d/ABCDEF123456/edit?usp=sharing
```

## Export

Following this [Stackoverflow answer](https://stackoverflow.com/questions/14014283/curl-google-spreadsheet-as-csv#answer-72493666), the link should be changed from:

```
https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit?usp=sharing
```

To:

```
https://docs.google.com/spreadsheets/d/<SHEET_ID>/export?exportFormat=csv
```

See diff:

```diff
-https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit?usp=sharing
+https://docs.google.com/spreadsheets/d/<SHEET_ID>/export?exportFormat=csv
```

> Make sure to replace the `<SHEET_ID>` with the Google Sheets spreadsheet ID.

Then download the spreadsheet using cURL:

```sh
curl -L "https://docs.google.com/spreadsheets/d/<SHEET_ID>/export?exportFormat=csv" -o my_sheet.csv
```

## Example

Given a public [Google Sheets spreadsheet](https://docs.google.com/spreadsheets/d/1OiuuC_WrDCRfhnYX9i9BJ75-F0frFuSkAIYOgf-Qf6I/edit#gid=0):

```
https://docs.google.com/spreadsheets/d/1OiuuC_WrDCRfhnYX9i9BJ75-F0frFuSkAIYOgf-Qf6I/edit?usp=sharing
```

Export and download the CSV with the Bash commands:

```bash
SHEET_ID='1OiuuC_WrDCRfhnYX9i9BJ75-F0frFuSkAIYOgf-Qf6I'
URL="https://docs.google.com/spreadsheets/d/$SHEET_ID/export?exportFormat=csv"
curl -L $URL -o my_sheet.csv
```

[Replit](https://replit.com/@remarkablemark/Bash-cURL-Google-Sheets#main.sh):

<iframe height="400px" width="100%" src="https://replit.com/@remarkablemark/Bash-cURL-Google-Sheets?lite=true#main.sh" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
