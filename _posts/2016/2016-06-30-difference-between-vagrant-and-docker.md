---
layout: post
title: The difference between Vagrant and Docker
date: 2016-06-30 05:25:00 -4000
excerpt: The difference between Vagrant, which manages virtual machines, and Docker, which manages containers .
categories: vagrant docker virtual machine container
---

For those who use **Vagrant** but are looking into **Docker**, you may be curious about the _difference_ between them.

_Solomon Hykes_, the author of Docker, gives his [take](http://stackoverflow.com/questions/16647069/should-i-use-vagrant-or-docker-for-creating-an-isolated-environment#answer-22370529):

> If you want to manage machines, you should use Vagrant... If you want to build and run application environments, you should use Docker.

In other words, _**Vagrant** manages virtual machines_ and _**Docker** packages apps into containers_. But even with his explanation, it can be quite difficult to wrap our heads around what it all means. So I'll try my best to explain with an analogy.

Imagine you have two pieces of real estate. The first is called _**Vagrantland**_ and the second is called _**Dockertown**_. They're both the same size and have the same underlying _infrastructure_ (e.g., water systems, electrical grids, pipes and cables).

Your job as a developer is to add stores, restaurants, and other businesses to it because right now, it's just an area of land with nothing on it.

In _**Vagrantland**_, every time a business is added, a new building must be constructed.

For example, to add a coffee shop (let's call it "Think Java"), you need to construct the physical shop and set up the building infrastructure (e.g., electricity, lighting, water). Once the building is erected, you add the necessary ingredients to make the place look and feel like an actual coffee shop.

Afterwards, you decide to add a furniture store called "Couch De Bee." Like "Think Java," you need to build a physical store with the same infrastructure. Then, the interior design and products will be added to make the store look like it's selling furniture.

So you could probably tell that _adding a business can be quite cumbersome and hard to scale in **Vagrantland**_.

Let's switch to _**Dockertown**_. First, a single building is constructed with all the infrastructure set up, just like a building in _**Vagrantland**_. The difference, however, is that the building in _**Dockertown**_ acts like a _mall_. So whenever a new business is added, it simply takes up space inside the building.

For instance, when a jewelry shop called "Ruby and Reals" is added, it simply finds a place in the mall and sets up the shop with the materials it needs to sell gems. And when a fruit stand called "Mongo" is added, it takes up a small space in the mall and starts doing business right away.

What's efficient here is that both businesses _share_ the same building infrastructure such as the lighting system and the bathroom facilities. In this scenario, _adding, removing, and changing businesses is fast, easy, and scalable_.

So let's bring everything together. What's similar between Vagrant's virtual machines and Docker's containers is that they both sit on top a _host operating system_. The difference, on the other hand, is _how the application is run_. For Vagrant, each virtual machine includes a _guest operating system_ with the application and its libraries and binaries. For Docker, the containers don't need a guest OS for each application since they all _share the same kernel_.

That's the key difference between Vagrant and Docker. For more information, check out this [visual diagram](https://www.docker.com/what-docker#VM) which illustrates this difference.
