---
layout: post
title: Tidy XML/HTML
date: 2018-03-28 20:21:03 -4000
excerpt: How to beautify XML and HTML using the `tidy` command.
categories: tidy xml html cli vim
---

### XML

Given file with XML content:

```sh
$ echo '<foo><bar/></foo>' > test.xml
```

You can pretty print the file with [`tidy`](http://tidy.sourceforge.net/):

```sh
$ tidy -i -xml test.xml
No warnings or errors were found.

<foo>
  <bar />
</foo>

To learn more about HTML Tidy see http://tidy.sourceforge.net
Please send bug reports to html-tidy@w3.org
HTML and CSS specifications are available from http://www.w3.org/
Lobby your company to join W3C, see http://www.w3.org/Consortium
```

To produce a **quiet** output, pass the `-q` switch:

```sh
$ tidy -iq -xml test.xml
<foo>
  <bar />
</foo>
```

To **modify** (overwrite) the file, pass the `-m` switch:

```sh
$ tidy -iqm -xml test.xml
```

### HTML

Given file with HTML content:

```sh
$ echo '<h1>Hello, world!</h1>' > index.html
```

To beautify HTML:

```sh
$ tidy -i index.html
line 1 column 1 - Warning: missing <!DOCTYPE> declaration
line 1 column 1 - Warning: inserting missing 'title' element
Info: Document content looks like HTML 3.2
2 warnings, 0 errors were found!

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 3.2//EN">

<html>
<head>
  <meta name="generator" content=
  "HTML Tidy for Mac OS X (vers 31 October 2006 - Apple Inc. build 15.17), see www.w3.org">

  <title></title>
</head>

<body>
  <h1>Hello, world!</h1>
</body>
</html>

To learn more about HTML Tidy see http://tidy.sourceforge.net
Please send bug reports to html-tidy@w3.org
HTML and CSS specifications are available from http://www.w3.org/
Lobby your company to join W3C, see http://www.w3.org/Consortium
```

### Vim

If you're inside a Vim editor, you can indent XML/HTML with the command:

```vim
:!tidy -im -xml -wrap 0 %
```
