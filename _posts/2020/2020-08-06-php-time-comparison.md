---
layout: post
title: PHP time comparison
date: 2020-08-06 21:58:46
excerpt: How to compare date time in PHP.
categories: php date time
---

## DateTime

You can compare time in PHP with [`DateTime`](https://www.php.net/manual/en/class.datetime.php):

```php
$datetime1 = new DateTime('01:00');
$datetime2 = new DateTime('00:00');
$datetime1 > $datetime2; // true
```

`DateTime` accepts any any date or time string.

## Timezone

The default [timezone](https://www.php.net/manual/en/class.datetimezone.php) is [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time):

```php
$datetime = new DateTime('13:00');
$datetime->getTimezone()->getName(); // 'UTC'
```

You can change the timezone by passing an instance of [`DateTimeZone`](https://www.php.net/manual/en/class.datetimezone.php) to [`DateTime::setTimezone`](https://www.php.net/manual/en/datetime.settimezone.php):

```php
$datetime = new DateTime('24:00');
$datetime->setTimezone(new DateTimeZone('EDT'));
```

Or pass timezone as the 2nd argument of `DateTime`:

```php
new DateTime('24:00', new DateTimeZone('America/New_York'));
```

## Example

If you want to check if the current time falls between a range, you can do the following:

```php
$timezone = new DateTimeZone('America/New_York');
$now = new DateTime('now', $timezone);
$start = new DateTime('12:30', $timezone)
$end = new DateTime('13:30', $timezone)
$now >= $start && $now <= $end;
```

This can be refactored to the function:

```php
function isBetweenTimes(string $start, string $end, string $timezone = 'UTC'): bool
{
    $timezone = new DateTimeZone($timezone);
    $now = new DateTime('now', $timezone);
    $start = new DateTime($start, $timezone);
    $end = new DateTime($end, $timezone);
    return $now >= $start && $now <= $end;
}
```

Which can be used like so:

```php
$range = '12:30-13:30';
[$start, $end] = explode('-', $range);
isBetweenTimes($start, $end, 'EDT');
```
