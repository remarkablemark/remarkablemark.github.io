---
layout: post
title: Copy files to S3 and invalidate CloudFront cache
date: 2019-04-13 15:12:07
excerpt: How to copy local files to S3 and then invalidate them from the CloudFront edge caches.
categories: aws cli s3 cloudfront bash
---

## Copy to S3

To [copy a local file to S3](https://docs.aws.amazon.com/cli/latest/reference/s3/cp.html#examples):

```sh
aws s3 cp build/index.html s3://mybucket/index.html
```

To copy multiple HTML files:

```sh
aws s3 cp build/ s3://mybucket/ --exclude '*' --include '*.html'
```

The reason `--exclude` comes before `--include` is because _all files are included_ by default.

If you want to have multiple includes:

```sh
aws s3 cp build/ s3://mybucket/ --exclude '*' --include '*.html' --include '*.js'
```

There's also the `--recursive` option to match files in subdirectories.

The next step is to [invalidate the files from the CloudFront edge caches](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Invalidation.html).

## Invalidate CloudFront

To invalidate a single file:

```sh
aws cloudfront create-invalidation --distribution-id $CDN_DISTRIBUTION_ID --paths '/index.html'
```

To invalidate multiple HTML files using the `*` wildcard:

```sh
aws cloudfront create-invalidation --distribution-id $CDN_DISTRIBUTION_ID --paths '/*'
```

When using the `*` wildcard character, make sure to wrap the path with quotes (`'` or `"`) or else [shell expansion](https://linuxcommand.org/lc3_lts0080.php) will occur.
