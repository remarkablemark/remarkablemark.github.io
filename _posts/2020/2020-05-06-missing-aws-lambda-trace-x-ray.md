---
layout: post
title: Missing AWS Lambda trace data for X-Ray
date: 2020-05-06 20:45:40
excerpt: How to mute or remove the error "Missing AWS Lambda trace data for X-Ray" when working with Serverless offline.
categories: serverless offline aws lambda trace x-ray error env
---

> **TL;DR**: You can disable tracing by setting the environment variable `DISABLE_XRAY_TRACING=1`

I was using [serverless-offline](https://github.com/dherault/serverless-offline) to emulate my [Serverless](https://www.serverless.com/) app locally.

But when I made a request to my endpoint, I received the error:

```
Error: Missing AWS Lambda trace data for X-Ray. Expected _X_AMZN_TRACE_ID to be set.
```

I noticed this was coming from [aws-xray-sdk-core](https://www.npmjs.com/package/aws-xray-sdk-core).

I found an [issue](https://github.com/dherault/serverless-offline/issues/327) that recommended setting the environment variable `AWS_XRAY_CONTEXT_MISSING` to `LOG_ERROR`:

```sh
AWS_XRAY_CONTEXT_MISSING=LOG_ERROR
```

I was able to access my endpoint without a 500 internal server error, but the error stacktrace was still logged to my console. This made debugging difficult.

So I tried setting the environment variable `_X_AMZN_TRACE_ID` to `0`:

```sh
_X_AMZN_TRACE_ID=0
```

Here, the only error in my console was:

```
_X_AMZN_TRACE_ID is missing required data.
```

Ultimately, I turned off tracing by setting the environment variable `DISABLE_XRAY_TRACING` to `1`:

```sh
DISABLE_XRAY_TRACING=1
```

This was the solution I chose for local development.
