---
layout: post
title: Sass @import partial
date: 2016-10-12 17:22:00
excerpt: How to import a Sass file in another Sass file.
categories: sass
---

This post goes over how to import a Sass file in another Sass file.

## Prerequisites

Before we get started, make sure you have [Sass installed](https://sass-lang.com/install):

```sh
gem install sass
```

Or if you don't have write permissions:

```sh
sudo gem install sass
```

## Import Sass

Now assuming the following directory structure:

```sh
tree
.
├── partial.scss
└── main.scss

0 directories, 2 files
```

How can we import `partial.scss` inside `main.scss`?

To do that, _two_ things must be done:

1\. Prepend an **underscore** to the filename:

```sh
mv partial.scss _partial.scss
```

2\. **@import** the partial:

```scss
// main.scss

@import 'partial';
```

If you have _more than one_ partial, you can separate each partial with a **comma**:

```scss
// main.scss

@import 'partial-1', 'partial-2';
```

If the partials are found in _different directories_, you'll need to specify the **relative paths**:

```scss
// main.scss

// parent directory partial
@import '../partial';

// subdirectory partial
@import 'sub/partial';
```

All Sass [variables](https://sass-lang.com/guide#topic-2), [mixins](https://sass-lang.com/guide#topic-6), and styles are cascaded in the order that they are imported.

Unfortunately, importing a partial _multiple times_ means that it's included _multiple times_.

That's why it's good practice to do all imports in a **_single_** file.

For more information about importing Sass partials, [Zurb](https://zurb.com) has a nice [introduction](https://zurb.com/university/lessons/wrangling-sass-import-files).
