---
layout: post
title: Docker Node.js EPIPE error
date: 2021-07-20 20:11:56
excerpt: How to fix the EPIPE error for your Node.js app running inside a Docker container.
categories: docker nodejs error
---

Recently, my Node.js app running inside a Docker container started crashing with the error:

```
Fatal error occurred. Exiting the app. (err.code=EPIPE)
    Error: write EPIPE
        at process.target._send (internal/child_process.js:806:20)
        at process.target.send (internal/child_process.js:676:19)
        at sendHelper (internal/cluster/utils.js:22:15)
        at send (internal/cluster/child.js:190:10)
        at EventEmitter.cluster._getServer (internal/cluster/child.js:89:3)
        at listenInCluster (net.js:1362:11)
        at Server.listen (net.js:1437:7)
```

I discovered this was caused by not allocating enough `Memory` and `Swap` in [Docker Desktop](https://www.docker.com/products/docker-desktop) > **Settings** > **Resources** > **Advanced**.

Once I doubled it for both, the error disappeared:

![Docker Resources]({{ "/images/2021/2021-07-20-docker-resources.png" | prepend: site.assets_path }})
