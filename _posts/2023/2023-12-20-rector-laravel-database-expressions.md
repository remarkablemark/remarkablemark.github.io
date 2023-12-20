---
layout: post
title: Rector to fix Laravel database expressions
date: 2023-12-20 15:15:21
excerpt: How to write a Rector rule to fix Laravel 10 database expressions.
categories: rector laravel php
---

This post goes over how to write a Rector rule to fix Laravel 10 database expressions.

## Problem

If you're getting the error after upgrading to [Laravel 10](https://laravel.com/docs/10.x/releases):

```
PDO::prepare (): Argument #1 ($query) must be of type string, Illuminate\Database|Query\ Expression given
```

This may be caused by `DB::raw` no longer being casted into `string`. For example, this no longer works:

```php
DB::select(DB::raw('select 1'));
```

The [upgrade document](https://laravel.com/docs/10.x/upgrade#database-expressions) suggests using a different approach to get the string value from a database expression. For example:

```php
DB::select(DB::raw('select 1')->getValue(DB::getQueryGrammar()));
```

So what can we do? [Rector](https://github.com/rectorphp/rector) to the rescue!

## Solution

[Rector](https://github.com/rectorphp/rector) is a code refactoring tool for PHP.

Given we initialize a [custom Rector rule](https://getrector.com/documentation/custom-rule):

```php
use Rector\Core\Rector\AbstractRector;
use Symplify\RuleDocGenerator\ValueObject\RuleDefinition;

final class LaravelDatabaseExpressionsRector extends AbstractRector;
{
    public function getRuleDefinition(): RuleDefinition
    {
        return new RuleDefinition(
            // ...
        );
    }

    public function getNodeTypes(): array
    {
        // ...
    }

    public function refactor(Node $node): ?Node
    {
        // ...
    }
}
```

To refactor to the following:

```diff
-DB::raw('select 1');
+DB::raw('select 1')->getValue(DB::getQueryGrammar());
```

You want to get nodes of type [`StaticCall`](https://github.com/rectorphp/php-parser-nodes-docs#phpparsernodeexprstaticcall):

```php
/**
 * @return array<class-string<Node>>
 */
public function getNodeTypes(): array
{
    return [\PhpParser\Node\Expr\StaticCall::class];
}
```

Then refactor the node so it chains a [`MethodCall`](https://github.com/rectorphp/php-parser-nodes-docs#phpparsernodeexprmethodcall) with the argument:

```php
/**
 * @param StaticCall $node
 */
public function refactor(Node $node): ?Node
{
    $className = isset($node->class) ? $this->getName($node->class) : '';
    $methodName = $this->getName($node->name);

    // skip if not `DB::raw`
    if (str_ends_with($className, 'DB') || $methodName !== 'raw') {
        return null;
    }

    // DB::getQueryGrammar()
    $arguments[] = new Arg(
        new StaticCall(
        new Name('DB'),
            'getQueryGrammar'
        )
    );

    // DB::raw(...)->getValue(DB::getQueryGrammar())
    $node->value = new MethodCall(
        $node,
        new Identifier('getValue'),
        $arguments
    );

    // DB::raw(...)->getValue(DB::getQueryGrammar())
    return $node;
}
```

But this will refactor all `DB::raw` nodes. Instead, you want to check and refactor only the child node of `DB::select`:

```php
/**
 * @param StaticCall $node
 */
public function refactor(Node $node): ?Node
{
    $className = $this->getName($childNode->class);
    $methodName = $this->getName($childNode->name);

    /** @var Node */
    $childNode = $node->args[0]->value ?? null;
    $childClassName = isset($childNode->class) ? $this->getName($childNode->class) : '';
    $childMethodName = $this->getName($childNode->name);

    if (
        // skip if not `DB::select`
        str_ends_with($className, 'DB') || $methodName !== 'select' ||
        // skip if not `DB::raw`
        str_ends_with($childClassName, 'DB') || $childMethodName !== 'raw'
    ) {
        return null;
    }

    // DB::getQueryGrammar()
    $arguments[] = new Arg(
        new StaticCall(
        new Name('DB'),
            'getQueryGrammar'
        )
    );

    // DB::raw(...)->getValue(DB::getQueryGrammar())
    $node->args[0]->value = new MethodCall(
        $childNode,
        new Identifier('getValue'),
        $arguments
    );

    // DB::select(DB::raw(...)->getValue(DB::getQueryGrammar()))
    return $node;
}
```

Running the Rector rule, it will refactor accordingly:

```diff
-DB::select(DB::raw('select 1'));
+DB::select(DB::raw('select 1')->getValue(DB::getQueryGrammar()));
```

## Rule

Check out the [Rector rule](https://github.com/remarkablemark/rector-laravel-database-expressions) if you want to install and apply to your codebase:

```sh
composer require --dev remarkablemark/rector-laravel-database-expressions
```
