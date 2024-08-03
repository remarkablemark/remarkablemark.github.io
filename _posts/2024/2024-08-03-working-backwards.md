---
layout: post
title: Working backwards
date: 2024-08-03 14:42:52
excerpt: Why working backwards is an important engineering skill.
categories: engineering
---

A key engineering skill is the act of **working backwards**. For example, let's say there are plans to update a screen in a software application. If you haven't worked in that area before, how would you go about changing it?

You start off with the text on the screen. Search the frontend codebase for that string. It might be inside an [i18n](https://wikipedia.org/wiki/Internationalization_and_localization) file or an HTML or [UI](https://wikipedia.org/wiki/User_interface) component. Once you identified which file the text is rendered in, then look for any API calls.

[API](https://wikipedia.org/wiki/API) requests will uncover the backend routes that is consumed by the frontend. By identifying the routes, you can identify the controllers that handle the business logic. Afterwards, you should be able to examine the models and understand how the data is manipulated and stored in the database.

As you debug and trace the stack from start to finish, you will form a picture of how the application works end-to-end.
