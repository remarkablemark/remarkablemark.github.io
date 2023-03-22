---
layout: post
title: Cloudflare Pages subdomain cache
date: 2023-03-22 18:10:59
excerpt: How to handle Cloudflare Pages subdomain cache.
categories: cloudflare pages subdomain cache
---

This post goes over how to handle [Cloudflare Pages](https://pages.cloudflare.com/) subdomain cache.

## Subdomain

To [set up a subdomain](https://developers.cloudflare.com/fundamentals/get-started/basic-tasks/manage-subdomains/#create-a-subdomain) for a Cloudflare Pages site, add a CNAME record.

[Pages's default caching beahvior](https://developers.cloudflare.com/pages/platform/serving-pages/#caching-and-performance):

> Pages comes with built in caching defaults that are optimized for caching as much as possible, while providing the most up to date content. Every time you deploy an asset to Pages, the asset remains cached on the Cloudflare CDN until your next deployment. Therefore, you should avoid setting Page Rules or custom caching on your site.

## Proxied

If the [Proxy status](https://developers.cloudflare.com/dns/manage-dns-records/reference/proxied-dns-records/#proxy-status) is **Proxied** or orange-clouded, then Cloudflare also caches your site on the [Edge Cache](https://developers.cloudflare.com/cache/about/default-cache-behavior#default-cache-behavior).

To bypass cache, create a [Page Rule](https://developers.cloudflare.com/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/#create-a-page-rule) or [Cache Rule](https://developers.cloudflare.com/cache/about/cache-rules/).

## DNS only

To prevent double caching, set the [Proxy status](https://developers.cloudflare.com/dns/manage-dns-records/reference/proxied-dns-records/#proxy-status) to **DNS only** so requests go straight to the origin server.

Another benefit of opting out of proxy is that the response times are faster since you save a redirect.
