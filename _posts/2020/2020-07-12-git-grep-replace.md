---
layout: post
title: Git grep replace string
date: 2020-07-12 16:13:36
excerpt: How to replace a string with git grep and sed.
categories: git grep sed xargs bash string
---

Find all occurrences of `$MATCH` and replace with `$REPLACE` (inspired by this [post](https://blog.jasonmeridth.com/posts/use-git-grep-to-replace-strings-in-files-in-your-git-repository/)):

```sh
git grep -l "$MATCH" | xargs sed -i "" -e "s/$MATCH/$REPLACE/g"
```

Find all occurrences of `$MATCH` but exclude `$EXCLUDE` and replace with `$REPLACE`:

```sh
git grep -l -e "$MATCH" --and --not -e "$EXCLUDE" | xargs sed -i "" -e "/$EXCLUDE/! s/$MATCH/$REPLACE/g"
```

## Example

Here's an example of how to replace `foo` with `bar` in your repository:

```bash
MATCH="foo"
REPLACE="bar"
git grep -l "$MATCH" | xargs sed -i "" -e "s/$MATCH/$REPLACE/g"
```

Here's an example of how to replace `foo` with `bar` (but not `foobar`) in your repository:

```bash
MATCH="foo"
EXCLUDE="foobar"
REPLACE="bar"
git grep -l -e "$MATCH" --and --not -e "$EXCLUDE" | xargs sed -i "" -e "/$EXCLUDE/! s/$MATCH/$REPLACE/g"
```

## Explanation

[`git grep`](https://git-scm.com/docs/git-grep) prints lines matching a pattern in the repository:

```sh
git grep "$MATCH"
```

[`git grep -l`](https://git-scm.com/docs/git-grep#Documentation/git-grep.txt--l) prints file paths matching a pattern in the repository:

```sh
git grep -l "$MATCH"
```

[`--and --not -e`](https://git-scm.com/docs/git-grep#Documentation/git-grep.txt--e) is used to exclude a pattern:

```sh
git grep -l -e "$MATCH" --and --not -e "$EXCLUDE"
```

The file paths are [piped](<https://en.wikipedia.org/wiki/Pipeline_(Unix)>) to [`xargs`](https://en.wikipedia.org/wiki/Xargs), which converts the paths into arguments for the [`sed`](https://en.wikipedia.org/wiki/Sed) command:

```sh
$FILE_PATHS | xargs sed
```

[`sed`](https://www.freebsd.org/cgi/man.cgi?query=sed) then does a global string replacement in place of the file:

```sh
sed -i "" -e "s/$MATCH/$REPLACE/g"
```

> To learn more about `sed`, see ["Replace text with sed"]({% post_url 2017/2017-09-18-sed-replace-text %}).

Finally, `/$EXCLUDE/!` in the command helps exclude a pattern from the match:

```sh
sed -i "" -e "/$EXCLUDE/! s/$MATCH/$REPLACE/g"
```
